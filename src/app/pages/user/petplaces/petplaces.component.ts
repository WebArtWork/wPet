import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petplaceFormComponents } from 'src/app/modules/petplace/formcomponents/petplace.formcomponents';
import { Petplace } from 'src/app/modules/petplace/interfaces/petplace.interface';
import { PetplaceService } from 'src/app/modules/petplace/services/petplace.service';

@Component({
	templateUrl: './petplaces.component.html',
	styleUrls: ['./petplaces.component.scss'],
	standalone: false
})
export class PetplacesComponent {
	places: Petplace[] = [];

	isMenuOpen = false;

	clinic_id = '';
	store_id = '';

	constructor(
		private _petplaceService: PetplaceService,
		private _form: FormService
	) {
		this.load();
	}

	form: FormInterface = this._form.getForm(
		'petplace',
		petplaceFormComponents
	);

	create(): void {
		this._form.modal<Petplace>(this.form, {
			label: 'Create',
			click: async (created: unknown, close: () => void) => {
				close();

				this._preCreate(created as Petplace);

				this._petplaceService
					.create(created as Petplace)
					.subscribe(() => {
						this.load();
					});
			}
		});
	}

	load(): void {
		this._petplaceService
			.get({ query: this._query() }, { name: 'public' })
			.subscribe((places) => {
				this.places.splice(0, this.places.length);

				this.places.push(...places);
			});
	}

	private _preCreate(petplace: Petplace): void {
		delete petplace.__created;
	}
	private _query(): string {
		let query = '';

		if (this.clinic_id) {
			query += (query ? '&' : '') + 'clinic=' + this.clinic_id;
		}

		if (this.store_id) {
			query += (query ? '&' : '') + 'store=' + this.store_id;
		}

		return query;
	}
}
