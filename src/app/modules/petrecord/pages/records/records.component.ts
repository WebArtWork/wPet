import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PetrecordService } from '../../services/petrecord.service';
import { Petrecord } from '../../interfaces/petrecord.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petrecordFormComponents } from '../../formcomponents/petrecord.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './records.component.html',
	styleUrls: ['./records.component.scss'],
	standalone: false
})
export class RecordsComponent {
	columns = [
		'name',
		'disease',
		'treatment',
		'procedure',
		'notes',
		'description'
	];

	form: FormInterface = this._form.getForm(
		'petrecord',
		petrecordFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._petrecordService.setPerPage.bind(
			this._petrecordService
		),
		allDocs: false,
		create: this._router.url.includes('records/')
			? (): void => {
					this._form.modal<Petrecord>(this.form, {
						label: 'Create',
						click: async (created: unknown, close: () => void) => {
							close();

							this._preCreate(created as Petrecord);

							await firstValueFrom(
								this._petrecordService.create(
									created as Petrecord
								)
							);

							this.setRows();
						}
					});
			  }
			: null,
		update: (doc: Petrecord): void => {
			this._form
				.modal<Petrecord>(this.form, [], doc)
				.then((updated: Petrecord) => {
					this._core.copy(updated, doc);

					this._petrecordService.update(doc);
				});
		},
		delete: (doc: Petrecord): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this petrecord?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._petrecordService.delete(doc)
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
				click: (doc: Petrecord): void => {
					this._form.modalUnique<Petrecord>('petrecord', 'url', doc);
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

	rows: Petrecord[] = [];

	pet_id = '';

	constructor(
		private _translate: TranslateService,
		private _petrecordService: PetrecordService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.setRows();

		this._route.paramMap.subscribe((params) => {
			this.pet_id = params.get('pet_id') || '';
		});
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._petrecordService
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
				.modalDocs<Petrecord>(create ? [] : this.rows)
				.then(async (petrecords: Petrecord[]) => {
					if (create) {
						for (const petrecord of petrecords) {
							this._preCreate(petrecord);

							await firstValueFrom(
								this._petrecordService.create(petrecord)
							);
						}
					} else {
						for (const petrecord of this.rows) {
							if (
								!petrecords.find(
									(localPetrecord) =>
										localPetrecord._id === petrecord._id
								)
							) {
								await firstValueFrom(
									this._petrecordService.delete(petrecord)
								);
							}
						}

						for (const petrecord of petrecords) {
							const localPetrecord = this.rows.find(
								(localPetrecord) =>
									localPetrecord._id === petrecord._id
							);

							if (localPetrecord) {
								this._core.copy(petrecord, localPetrecord);

								await firstValueFrom(
									this._petrecordService.update(
										localPetrecord
									)
								);
							} else {
								this._preCreate(petrecord);

								await firstValueFrom(
									this._petrecordService.create(petrecord)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(petrecord: Petrecord): void {
		delete petrecord.__created;

		if (this.pet_id) {
			petrecord.pet = this.pet_id;
		}
	}

	private _query(): string {
		let query = '';

		if (this.pet_id) {
			query += (query ? '&' : '') + 'pet=' + this.pet_id;
		}

		return query;
	}
}
