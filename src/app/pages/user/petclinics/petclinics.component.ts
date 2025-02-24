import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Value } from 'src/app/core/modules/input/input.component';
import { petclinicFormComponents } from 'src/app/modules/petclinic/formcomponents/petclinic.formcomponents';
import { Petclinic } from 'src/app/modules/petclinic/interfaces/petclinic.interface';
import { PetclinicService } from 'src/app/modules/petclinic/services/petclinic.service';
import { Petdrug } from 'src/app/modules/petdrug/interfaces/petdrug.interface';
import { PetdrugService } from 'src/app/modules/petdrug/services/petdrug.service';

@Component({
	templateUrl: './petclinics.component.html',
	styleUrls: ['./petclinics.component.scss'],
	standalone: false
})
export class PetclinicsComponent {
	clinics: Petclinic[] = [];
	drugs: Petdrug[] = [];

	isMenuOpen = false;

	clinic_drug = '';
	search = '';

	constructor(
		private _petclinicService: PetclinicService,
		private _petdrugService: PetdrugService,
		private _form: FormService
	) {
		this.load();

		this._petdrugService.get().subscribe((drugs) => {
			this.drugs.splice(0, this.drugs.length);

			this.drugs.push(...drugs);
		});
	}

	form: FormInterface = this._form.getForm(
		'petclinic',
		petclinicFormComponents
	);

	setSearch(value: Value): void {
		this.search = (value as string) || '';
	}

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
			.get({ query: this._query() }, { name: 'public' })
			.subscribe((clinics) => {
				this.clinics.splice(0, this.clinics.length);

				this.clinics.push(...clinics);
			});
	}

	private _preCreate(petclinic: Petclinic): void {
		delete petclinic.__created;
	}

	private _query(): string {
		let query = '';

		if (this.clinic_drug) {
			query += (query ? '&' : '') + 'clinic_drug=' + this.clinic_drug;
		}
		if (this.search) {
			query += (query ? '&' : '') + 'search=' + this.search;
		}

		return query;
	}
}
