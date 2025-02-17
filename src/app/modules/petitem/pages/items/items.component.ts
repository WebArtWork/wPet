import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PetitemService } from '../../services/petitem.service';
import { Petitem } from '../../interfaces/petitem.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petitemFormComponents } from '../../formcomponents/petitem.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './items.component.html',
	styleUrls: ['./items.component.scss'],
	standalone: false
})
export class ItemsComponent {
	columns = ['name', 'itemtype', 'material', 'price', 'description'];

	form: FormInterface = this._form.getForm('petitem', petitemFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._petitemService.setPerPage.bind(this._petitemService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Petitem>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Petitem);

					await firstValueFrom(
						this._petitemService.create(created as Petitem)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Petitem): void => {
			this._form
				.modal<Petitem>(this.form, [], doc)
				.then((updated: Petitem) => {
					this._core.copy(updated, doc);

					this._petitemService.update(doc);
				});
		},
		delete: (doc: Petitem): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this petitem?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._petitemService.delete(doc)
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
				click: (doc: Petitem): void => {
					this._form.modalUnique<Petitem>('petitem', 'url', doc);
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

	rows: Petitem[] = [];

	place_id = '';

	constructor(
		private _translate: TranslateService,
		private _petitemService: PetitemService,
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
				this._petitemService
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
				.modalDocs<Petitem>(create ? [] : this.rows)
				.then(async (petitems: Petitem[]) => {
					if (create) {
						for (const petitem of petitems) {
							this._preCreate(petitem);

							await firstValueFrom(
								this._petitemService.create(petitem)
							);
						}
					} else {
						for (const petitem of this.rows) {
							if (
								!petitems.find(
									(localPetitem) =>
										localPetitem._id === petitem._id
								)
							) {
								await firstValueFrom(
									this._petitemService.delete(petitem)
								);
							}
						}

						for (const petitem of petitems) {
							const localPetitem = this.rows.find(
								(localPetitem) =>
									localPetitem._id === petitem._id
							);

							if (localPetitem) {
								this._core.copy(petitem, localPetitem);

								await firstValueFrom(
									this._petitemService.update(localPetitem)
								);
							} else {
								this._preCreate(petitem);

								await firstValueFrom(
									this._petitemService.create(petitem)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(petitem: Petitem): void {
		delete petitem.__created;

		if (this.place_id) {
			petitem.place = this.place_id;
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
