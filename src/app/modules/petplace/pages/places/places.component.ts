import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PetplaceService } from '../../services/petplace.service';
import { Petplace } from '../../interfaces/petplace.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petplaceFormComponents } from '../../formcomponents/petplace.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './places.component.html',
	styleUrls: ['./places.component.scss'],
	standalone: false
})
export class PlacesComponent {
	columns = [
		'name',
		'address',
		'latitude',
		'longitude',
		'placeType',
		'description'
	];

	form: FormInterface = this._form.getForm(
		'petplace',
		petplaceFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._petplaceService.setPerPage.bind(
			this._petplaceService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Petplace>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Petplace);

					await firstValueFrom(
						this._petplaceService.create(created as Petplace)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Petplace): void => {
			this._form
				.modal<Petplace>(this.form, [], doc)
				.then((updated: Petplace) => {
					this._core.copy(updated, doc);

					this._petplaceService.update(doc);
				});
		},
		delete: (doc: Petplace): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this petplace?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._petplaceService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'medication',
				hrefFunc: (doc: Petplace): string => {
					return '/drugs/' + doc._id;
				}
			},
			{
				icon: 'restaurant_menu',
				hrefFunc: (doc: Petplace): string => {
					return '/food/' + doc._id;
				}
			},
			{
				icon: 'category',
				hrefFunc: (doc: Petplace): string => {
					return '/items/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Petplace): void => {
					this._form.modalUnique<Petplace>('petplace', 'url', doc);
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

	rows: Petplace[] = [];

	clinic_id = '';
	store_id = '';

	constructor(
		private _translate: TranslateService,
		private _petplaceService: PetplaceService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _route: ActivatedRoute
	) {
		this.setRows();

		this._route.paramMap.subscribe((params) => {
			this.clinic_id = params.get('clinic_id') || '';
			this.store_id = params.get('store_id') || '';
		});
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._petplaceService
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
				.modalDocs<Petplace>(create ? [] : this.rows)
				.then(async (petplaces: Petplace[]) => {
					if (create) {
						for (const petplace of petplaces) {
							this._preCreate(petplace);

							await firstValueFrom(
								this._petplaceService.create(petplace)
							);
						}
					} else {
						for (const petplace of this.rows) {
							if (
								!petplaces.find(
									(localPetplace) =>
										localPetplace._id === petplace._id
								)
							) {
								await firstValueFrom(
									this._petplaceService.delete(petplace)
								);
							}
						}

						for (const petplace of petplaces) {
							const localPetplace = this.rows.find(
								(localPetplace) =>
									localPetplace._id === petplace._id
							);

							if (localPetplace) {
								this._core.copy(petplace, localPetplace);

								await firstValueFrom(
									this._petplaceService.update(localPetplace)
								);
							} else {
								this._preCreate(petplace);

								await firstValueFrom(
									this._petplaceService.create(petplace)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(petplace: Petplace): void {
		delete petplace.__created;

		if (this.clinic_id) {
			petplace.clinic = this.clinic_id;
		}
		if (this.store_id) {
			petplace.store = this.store_id;
		}
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
