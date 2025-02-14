import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petstoreFormComponents } from 'src/app/modules/petstore/formcomponents/petstore.formcomponents';
import { Petstore } from 'src/app/modules/petstore/interfaces/petstore.interface';
import { PetstoreService } from 'src/app/modules/petstore/services/petstore.service';

import { Petfood } from 'src/app/modules/petfood/interfaces/petfood.interface';
import { Petitem } from 'src/app/modules/petitem/interfaces/petitem.interface';
import { PetfoodService } from 'src/app/modules/petfood/services/petfood.service';
import { PetitemService } from 'src/app/modules/petitem/services/petitem.service';
import { Value } from 'src/app/core/modules/input/input.component';

@Component({
	templateUrl: './petstore.component.html',
	styleUrls: ['./petstore.component.scss'],
	standalone: false
})
export class PetstoreComponent {
	stores: Petstore[] = [];
	food: Petfood[] = [];
	items: Petitem[] = [];

	isMenuOpen = false;

	store_food = '';
	store_item = '';
	search = '';

	constructor(
		private _petstoreService: PetstoreService,
		private _form: FormService,

		private _petfoodService: PetfoodService,
		private _petitemService: PetitemService
	) {
		this.load();

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
		'petstore',
		petstoreFormComponents
	);

	setSearch(value: Value): void {
		this.search = (value as string) || '';
	}

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

	private _preCreate(petstores: Petstore): void {
		delete petstores.__created;
	}

	private _query(): string {
		let query = '';

		if (this.store_food) {
			query += (query ? '&' : '') + 'store_food=' + this.store_food;
		}
		if (this.store_item) {
			query += (query ? '&' : '') + 'store_item=' + this.store_item;
		}
		if (this.search) {
			query += (query ? '&' : '') + 'search=' + this.search;
		}

		return query;
	}
}
