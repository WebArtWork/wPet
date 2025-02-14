import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Value } from 'src/app/core/modules/input/input.component';
import { Petclinic } from 'src/app/modules/petclinic/interfaces/petclinic.interface';
import { PetclinicService } from 'src/app/modules/petclinic/services/petclinic.service';
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

	clinics: Petclinic[] = [];

	isMenuOpen = false;

	clinic_id = '';
	search = '';

	constructor(
		private _petdoctorService: PetdoctorService,
		private _form: FormService,

		private _petclinicService: PetclinicService
	) {
		this.load();
		this.selectorsLoad();
	}

	form: FormInterface = this._form.getForm(
		'petdoctor',
		petdoctorFormComponents
	);

	setSearch(value: Value): void {
		this.search = (value as string) || '';
	}

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
			.get({ query: this._query() }, { name: 'public' })
			.subscribe((doctors) => {
				this.doctors.splice(0, this.doctors.length);

				this.doctors.push(...doctors);
			});
	}

	//	TODO temporary code {
	selectorsLoad(): void {
		this._petclinicService
			.get({}, { name: 'public' })
			.subscribe((clinics) => {
				this.clinics.splice(0, this.clinics.length);

				this.clinics.push(...clinics);
			});
	}
	//	}

	private _preCreate(petdoctor: Petdoctor): void {
		delete petdoctor.__created;
	}

	private _query(): string {
		let query = '';

		if (this.clinic_id) {
			query += (query ? '&' : '') + 'clinic=' + this.clinic_id;
		}
		if (this.search) {
			query += (query ? '&' : '') + 'search=' + this.search;
		}

		return query;
	}
}
