import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PetstoreService } from '../../services/petstore.service';
import { Petstore } from '../../interfaces/petstore.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petstoreFormComponents } from '../../formcomponents/petstore.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	templateUrl: './store.component.html',
	styleUrls: ['./store.component.scss'],
	standalone: false
})
export class StoreComponent {
	columns = [
		'name',
		'phone',
		'email',
		'workingHours',
		'deliveryOptions',
		'paymentMethods',
		'description'
	];

	form: FormInterface = this._form.getForm(
		'petstore',
		petstoreFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._petstoreService.setPerPage.bind(
			this._petstoreService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Petstore>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Petstore);

					await firstValueFrom(
						this._petstoreService.create(created as Petstore)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Petstore): void => {
			this._form
				.modal<Petstore>(this.form, [], doc)
				.then((updated: Petstore) => {
					this._core.copy(updated, doc);

					this._petstoreService.update(doc);
				});
		},
		delete: (doc: Petstore): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this petstore?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._petstoreService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'place',
				hrefFunc: (doc: Petstore): string => {
					return '/places/' + 'store/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Petstore): void => {
					this._form.modalUnique<Petstore>('petstore', 'url', doc);
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

	rows: Petstore[] = [];

	store_id = '';

	constructor(
		private _translate: TranslateService,
		private _petstoreService: PetstoreService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _route: ActivatedRoute
	) {
		this.setRows();

		this._route.paramMap.subscribe((params) => {
			this.store_id = params.get('store_id') || '';
		});
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._petstoreService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Petstore>(create ? [] : this.rows)
				.then(async (petstores: Petstore[]) => {
					if (create) {
						for (const petstore of petstores) {
							this._preCreate(petstore);

							await firstValueFrom(
								this._petstoreService.create(petstore)
							);
						}
					} else {
						for (const petstore of this.rows) {
							if (
								!petstores.find(
									(localPetstore) =>
										localPetstore._id === petstore._id
								)
							) {
								await firstValueFrom(
									this._petstoreService.delete(petstore)
								);
							}
						}

						for (const petstore of petstores) {
							const localPetstore = this.rows.find(
								(localPetstore) =>
									localPetstore._id === petstore._id
							);

							if (localPetstore) {
								this._core.copy(petstore, localPetstore);

								await firstValueFrom(
									this._petstoreService.update(localPetstore)
								);
							} else {
								this._preCreate(petstore);

								await firstValueFrom(
									this._petstoreService.create(petstore)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(petstore: Petstore): void {
		delete petstore.__created;
	}
}
