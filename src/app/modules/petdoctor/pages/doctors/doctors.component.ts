import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PetdoctorService } from '../../services/petdoctor.service';
import { Petdoctor } from '../../interfaces/petdoctor.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petdoctorFormComponents } from '../../formcomponents/petdoctor.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './doctors.component.html',
	styleUrls: ['./doctors.component.scss'],
	standalone: false
})
export class DoctorsComponent {
	columns = [
		'name',
		'specialization',
		'phone',
		'email',
		'workingHours',
		'description'
	];

	form: FormInterface = this._form.getForm(
		'petdoctor',
		petdoctorFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._petdoctorService.setPerPage.bind(
			this._petdoctorService
		),
		allDocs: false,
		create: this._router.url.includes('doctors/')
			? (): void => {
					this._form.modal<Petdoctor>(this.form, {
						label: 'Create',
						click: async (created: unknown, close: () => void) => {
							close();

							this._preCreate(created as Petdoctor);

							await firstValueFrom(
								this._petdoctorService.create(
									created as Petdoctor
								)
							);

							this.setRows();
						}
					});
			  }
			: null,
		update: (doc: Petdoctor): void => {
			this._form
				.modal<Petdoctor>(this.form, [], doc)
				.then((updated: Petdoctor) => {
					this._core.copy(updated, doc);

					this._petdoctorService.update(doc);
				});
		},
		delete: (doc: Petdoctor): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this petdoctor?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._petdoctorService.delete(doc)
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
				click: (doc: Petdoctor): void => {
					this._form.modalUnique<Petdoctor>('petdoctor', 'url', doc);
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

	rows: Petdoctor[] = [];

	clinic_id = '';

	constructor(
		private _translate: TranslateService,
		private _petdoctorService: PetdoctorService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.setRows();

		this._route.paramMap.subscribe((params) => {
			this.clinic_id = params.get('clinic_id') || '';
		});
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._petdoctorService
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
				.modalDocs<Petdoctor>(create ? [] : this.rows)
				.then(async (petdoctors: Petdoctor[]) => {
					if (create) {
						for (const petdoctor of petdoctors) {
							this._preCreate(petdoctor);

							await firstValueFrom(
								this._petdoctorService.create(petdoctor)
							);
						}
					} else {
						for (const petdoctor of this.rows) {
							if (
								!petdoctors.find(
									(localPetdoctor) =>
										localPetdoctor._id === petdoctor._id
								)
							) {
								await firstValueFrom(
									this._petdoctorService.delete(petdoctor)
								);
							}
						}

						for (const petdoctor of petdoctors) {
							const localPetdoctor = this.rows.find(
								(localPetdoctor) =>
									localPetdoctor._id === petdoctor._id
							);

							if (localPetdoctor) {
								this._core.copy(petdoctor, localPetdoctor);

								await firstValueFrom(
									this._petdoctorService.update(
										localPetdoctor
									)
								);
							} else {
								this._preCreate(petdoctor);

								await firstValueFrom(
									this._petdoctorService.create(petdoctor)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(petdoctor: Petdoctor): void {
		delete petdoctor.__created;

		if (this.clinic_id) {
			petdoctor.clinic = this.clinic_id;
		}
	}

	private _query(): string {
		let query = '';

		if (this.clinic_id) {
			query += (query ? '&' : '') + 'clinic=' + this.clinic_id;
		}

		return query;
	}
}
