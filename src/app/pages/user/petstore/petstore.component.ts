import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petstoreFormComponents } from 'src/app/modules/petstore/formcomponents/petstore.formcomponents';
import { Petstore } from 'src/app/modules/petstore/interfaces/petstore.interface';
import { PetstoreService } from 'src/app/modules/petstore/services/petstore.service';

import { Petdrug } from 'src/app/modules/petdrug/interfaces/petdrug.interface';
import { PetdrugService } from 'src/app/modules/petdrug/services/petdrug.service';
import { Petfood } from 'src/app/modules/petfood/interfaces/petfood.interface';
import { PetfoodService } from 'src/app/modules/petfood/services/petfood.service';
import { Petitem } from 'src/app/modules/petitem/interfaces/petitem.interface';
import { PetitemService } from 'src/app/modules/petitem/services/petitem.service';

@Component({
	templateUrl: './petstore.component.html',
	styleUrls: ['./petstore.component.scss'],
	standalone: false
})
export class PetstoreComponent {
	stores: Petstore[] = [];
	drugs: Petdrug[] = [];
	food: Petfood[] = [];
	items: Petitem[] = [];

	isMenuOpen = false;

	store_drug = '';
	store_food = '';
	store_item = '';

	constructor(
		private _petstoreService: PetstoreService,
		private _form: FormService,

		private _petdrugService: PetdrugService,
		private _petfoodService: PetfoodService,
		private _petitemService: PetitemService
	) {
		this.load();
		this.selectorsLoad();
	}

	form: FormInterface = this._form.getForm(
		'petstore',
		petstoreFormComponents
	);

	create(): void {
		this._form.modal<Petstore>(this.form, {
			label: 'Create',
			click: async (created: unknown, close: () => void) => {
				close();

				this._preCreate(created as Petstore);

				this._petstoreService
					.create(created as Petstore)
					.subscribe(() => {
						this.load();
					});
			}
		});
	}

	load(): void {
		this._petstoreService
			.get({ query: this._query() }, { name: 'public' })
			.subscribe((stores) => {
				this.stores.splice(0, this.stores.length);

				this.stores.push(...stores);
			});
	}

	//	TODO temporary code {
	selectorsLoad(): void {
		this._petdrugService.get({}, { name: 'public' }).subscribe((drugs) => {
			this.drugs.splice(0, this.drugs.length);

			this.drugs.push(...drugs);
		});
		this._petfoodService.get({}, { name: 'public' }).subscribe((food) => {
			this.food.splice(0, this.food.length);

			this.food.push(...food);
		});
		this._petitemService.get({}, { name: 'public' }).subscribe((items) => {
			this.items.splice(0, this.items.length);

			this.items.push(...items);
		});
	}
	//	}

	private _preCreate(petstores: Petstore): void {
		delete petstores.__created;
	}

	private _query(): string {
		let query = '';

		if (this.store_drug) {
			query += (query ? '&' : '') + 'store_drug=' + this.store_drug;
		}
		if (this.store_food) {
			query += (query ? '&' : '') + 'store_food=' + this.store_food;
		}
		if (this.store_item) {
			query += (query ? '&' : '') + 'store_item=' + this.store_item;
		}

		return query;
	}
}
