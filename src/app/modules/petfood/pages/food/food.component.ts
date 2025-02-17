import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PetfoodService } from '../../services/petfood.service';
import { Petfood } from '../../interfaces/petfood.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petfoodFormComponents } from '../../formcomponents/petfood.formcomponents';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	templateUrl: './food.component.html',
	styleUrls: ['./food.component.scss'],
	standalone: false
})
export class FoodComponent {
	columns = [
		'name',
		'foodbrand',
		'foodtype',
		'flavor',
		'quantity',
		'feedinginstructions',
		'description'
	];

	form: FormInterface = this._form.getForm('petfood', petfoodFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._petfoodService.setPerPage.bind(this._petfoodService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Petfood>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Petfood);

					await firstValueFrom(
						this._petfoodService.create(created as Petfood)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Petfood): void => {
			this._form
				.modal<Petfood>(this.form, [], doc)
				.then((updated: Petfood) => {
					this._core.copy(updated, doc);

					this._petfoodService.update(doc);
				});
		},
		delete: (doc: Petfood): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this petfood?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._petfoodService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Petfood): void => {
					this._form.modalUnique<Petfood>('petfood', 'url', doc);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist'
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	rows: Petfood[] = [];

	place_id = '';

	constructor(
		private _translate: TranslateService,
		private _petfoodService: PetfoodService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.setRows();

		this._route.paramMap.subscribe((params) => {
			this.place_id = params.get('place_id') || '';
		});
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._petfoodService
					.get({ page, query: this._query() })
					.subscribe((rows) => {
						this.rows.splice(0, this.rows.length);

						this.rows.push(...rows);
					});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Petfood>(create ? [] : this.rows)
				.then(async (petfoods: Petfood[]) => {
					if (create) {
						for (const petfood of petfoods) {
							this._preCreate(petfood);

							await firstValueFrom(
								this._petfoodService.create(petfood)
							);
						}
					} else {
						for (const petfood of this.rows) {
							if (
								!petfoods.find(
									(localPetfood) =>
										localPetfood._id === petfood._id
								)
							) {
								await firstValueFrom(
									this._petfoodService.delete(petfood)
								);
							}
						}

						for (const petfood of petfoods) {
							const localPetfood = this.rows.find(
								(localPetfood) =>
									localPetfood._id === petfood._id
							);

							if (localPetfood) {
								this._core.copy(petfood, localPetfood);

								await firstValueFrom(
									this._petfoodService.update(localPetfood)
								);
							} else {
								this._preCreate(petfood);

								await firstValueFrom(
									this._petfoodService.create(petfood)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(petfood: Petfood): void {
		delete petfood.__created;

		if (this.place_id) {
			petfood.place = this.place_id;
		}
	}

	private _query(): string {
		let query = '';

		if (this.place_id) {
			query += (query ? '&' : '') + 'place=' + this.place_id;
		}

		return query;
	}
}
