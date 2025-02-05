import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petclinicFormComponents } from 'src/app/modules/petclinic/formcomponents/petclinic.formcomponents';
import { Petclinic } from 'src/app/modules/petclinic/interfaces/petclinic.interface';
import { PetclinicService } from 'src/app/modules/petclinic/services/petclinic.service';

@Component({
	templateUrl: './petclinics.component.html',
	styleUrls: ['./petclinics.component.scss'],
	standalone: false
})
export class PetclinicsComponent {
	clinics: Petclinic[] = [];

	isMenuOpen = false;

	constructor(
		private _petclinicService: PetclinicService,
		private _form: FormService
	) {
		this.load();
	}

	form: FormInterface = this._form.getForm(
		'petclinic',
		petclinicFormComponents
	);

	create(): void {
		this._form.modal<Petclinic>(this.form, {
			label: 'Create',
			click: async (created: unknown, close: () => void) => {
				close();

				this._preCreate(created as Petclinic);

				this._petclinicService
					.create(created as Petclinic)
					.subscribe(() => {
						this.load();
					});
			}
		});
	}

	load(): void {
		this._petclinicService
			.get({}, { name: 'public' })
			.subscribe((clinics) => {
				this.clinics.splice(0, this.clinics.length);

				this.clinics.push(...clinics);
			});
	}

	private _preCreate(petclinic: Petclinic): void {
		delete petclinic.__created;
	}
}
