import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PetdrugService } from '../../services/petdrug.service';
import { Petdrug } from '../../interfaces/petdrug.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petdrugFormComponents } from '../../formcomponents/petdrug.formcomponents';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	templateUrl: './drugs.component.html',
	styleUrls: ['./drugs.component.scss'],
	standalone: false
})
export class DrugsComponent {
	columns = [
		'name',
		'dosage',
		'frequency',
		'usageperiod',
		'purpose',
		'description'
	];

	form: FormInterface = this._form.getForm('petdrug', petdrugFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._petdrugService.setPerPage.bind(this._petdrugService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Petdrug>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Petdrug);

					await firstValueFrom(
						this._petdrugService.create(created as Petdrug)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Petdrug): void => {
			this._form
				.modal<Petdrug>(this.form, [], doc)
				.then((updated: Petdrug) => {
					this._core.copy(updated, doc);

					this._petdrugService.update(doc);
				});
		},
		delete: (doc: Petdrug): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this petdrug?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._petdrugService.delete(doc)
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
				click: (doc: Petdrug): void => {
					this._form.modalUnique<Petdrug>('petdrug', 'url', doc);
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

	rows: Petdrug[] = [];

	place_id = '';

	constructor(
		private _translate: TranslateService,
		private _petdrugService: PetdrugService,
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
				this._petdrugService
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
				.modalDocs<Petdrug>(create ? [] : this.rows)
				.then(async (petdrugs: Petdrug[]) => {
					if (create) {
						for (const petdrug of petdrugs) {
							this._preCreate(petdrug);

							await firstValueFrom(
								this._petdrugService.create(petdrug)
							);
						}
					} else {
						for (const petdrug of this.rows) {
							if (
								!petdrugs.find(
									(localPetdrug) =>
										localPetdrug._id === petdrug._id
								)
							) {
								await firstValueFrom(
									this._petdrugService.delete(petdrug)
								);
							}
						}

						for (const petdrug of petdrugs) {
							const localPetdrug = this.rows.find(
								(localPetdrug) =>
									localPetdrug._id === petdrug._id
							);

							if (localPetdrug) {
								this._core.copy(petdrug, localPetdrug);

								await firstValueFrom(
									this._petdrugService.update(localPetdrug)
								);
							} else {
								this._preCreate(petdrug);

								await firstValueFrom(
									this._petdrugService.create(petdrug)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(petdrug: Petdrug): void {
		delete petdrug.__created;

		if (this.place_id) {
			petdrug.place = this.place_id;
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
