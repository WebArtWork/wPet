import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petplaceFormComponents } from 'src/app/modules/petplace/formcomponents/petplace.formcomponents';
import { Petplace } from 'src/app/modules/petplace/interfaces/petplace.interface';
import { PetplaceService } from 'src/app/modules/petplace/services/petplace.service';

import { Petdrug } from 'src/app/modules/petdrug/interfaces/petdrug.interface';
import { Petfood } from 'src/app/modules/petfood/interfaces/petfood.interface';
import { Petitem } from 'src/app/modules/petitem/interfaces/petitem.interface';
import { PetdrugService } from 'src/app/modules/petdrug/services/petdrug.service';
import { PetfoodService } from 'src/app/modules/petfood/services/petfood.service';
import { PetitemService } from 'src/app/modules/petitem/services/petitem.service';
import { Value } from 'src/app/core/modules/input/input.component';

@Component({
	templateUrl: './petplaces.component.html',
	styleUrls: ['./petplaces.component.scss'],
	standalone: false
})
export class PetplacesComponent {
	places: Petplace[] = [];
	drugs: Petdrug[] = [];
	food: Petfood[] = [];
	items: Petitem[] = [];

	isMenuOpen = false;
	drugDisabled = false;
	foodDisabled = false;
	itemDisabled = false;

	place_drug = '';
	place_food = '';
	place_item = '';
	search = '';

	constructor(
		private _petplaceService: PetplaceService,
		private _form: FormService,

		private _petdrugService: PetdrugService,
		private _petfoodService: PetfoodService,
		private _petitemService: PetitemService
	) {
		this.load();

		this._petdrugService.get().subscribe((drugs) => {
			this.drugs.splice(0, this.drugs.length);

			this.drugs.push(...drugs);
		});
		this._petfoodService.get().subscribe((food) => {
			this.food.splice(0, this.food.length);

			this.food.push(...food);
		});
		this._petitemService.get().subscribe((items) => {
			this.items.splice(0, this.items.length);

			this.items.push(...items);
		});
	}

	form: FormInterface = this._form.getForm(
		'petplace',
		petplaceFormComponents
	);

	setSearch(value: Value): void {
		this.search = (value as string) || '';
	}

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

		this.drugDisabled =
			this.place_food ||
			this.place_item ||
			(this.place_food && this.place_item)
				? true
				: false;
		this.foodDisabled = this.place_drug ? true : false;
		this.itemDisabled = this.place_drug ? true : false;
	}

	private _preCreate(petplace: Petplace): void {
		delete petplace.__created;
	}
	private _query(): string {
		let query = '';

		if (this.place_drug) {
			query += (query ? '&' : '') + 'place_drug=' + this.place_drug;
		}

		if (this.place_food) {
			query += (query ? '&' : '') + 'place_food=' + this.place_food;
		}

		if (this.place_item) {
			query += (query ? '&' : '') + 'place_item=' + this.place_item;
		}
		if (this.search) {
			query += (query ? '&' : '') + 'search=' + this.search;
		}

		return query;
	}
}
