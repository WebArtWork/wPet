import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petdoctorFormComponents } from 'src/app/modules/petdoctor/formcomponents/petdoctor.formcomponents';
import { Petdoctor } from 'src/app/modules/petdoctor/interfaces/petdoctor.interface';
import { PetdoctorService } from 'src/app/modules/petdoctor/services/petdoctor.service';

@Component({
	templateUrl: './petdoctors.component.html',
	styleUrls: ['./petdoctors.component.scss'],
	standalone: false
})
export class PetdoctorsComponent {
	doctors: Petdoctor[] = [];

	isMenuOpen = false;

	clinic_id = '';

	constructor(
		private _petdoctorService: PetdoctorService,
		private _form: FormService
	) {
		this.load();
	}

	form: FormInterface = this._form.getForm(
		'petdoctor',
		petdoctorFormComponents
	);

	create(): void {
		this._form.modal<Petdoctor>(this.form, {
			label: 'Create',
			click: async (created: unknown, close: () => void) => {
				close();

				this._preCreate(created as Petdoctor);

				this._petdoctorService
					.create(created as Petdoctor)
					.subscribe(() => {
						this.load();
					});
			}
		});
	}

	load(): void {
		this._petdoctorService
			.get(
				{ query: this.clinic_id ? 'clinic=' + this.clinic_id : '' },
				{ name: 'public' }
			)
			.subscribe((doctors) => {
				this.doctors.splice(0, this.doctors.length);

				this.doctors.push(...doctors);
			});
	}

	private _preCreate(petdoctor: Petdoctor): void {
		delete petdoctor.__created;
	}
}
