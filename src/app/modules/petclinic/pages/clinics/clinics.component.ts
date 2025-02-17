import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PetclinicService } from '../../services/petclinic.service';
import { Petclinic } from '../../interfaces/petclinic.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petclinicFormComponents } from '../../formcomponents/petclinic.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './clinics.component.html',
	styleUrls: ['./clinics.component.scss'],
	standalone: false
})
export class ClinicsComponent {
	columns = [
		'name',
		'address',
		'phone',
		'email',
		'workingHours',
		'description'
	];

	form: FormInterface = this._form.getForm(
		'petclinic',
		petclinicFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._petclinicService.setPerPage.bind(
			this._petclinicService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Petclinic>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Petclinic);

					await firstValueFrom(
						this._petclinicService.create(created as Petclinic)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Petclinic): void => {
			this._form
				.modal<Petclinic>(this.form, [], doc)
				.then((updated: Petclinic) => {
					this._core.copy(updated, doc);

					this._petclinicService.update(doc);
				});
		},
		delete: (doc: Petclinic): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this petclinic?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._petclinicService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'badge',
				hrefFunc: (doc: Petclinic): string => {
					return '/doctors/' + doc._id;
				}
			},
			{
				icon: 'place',
				hrefFunc: (doc: Petclinic): string => {
					return '/places/' + 'clinic/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Petclinic): void => {
					this._form.modalUnique<Petclinic>('petclinic', 'url', doc);
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

	rows: Petclinic[] = [];

	constructor(
		private _translate: TranslateService,
		private _petclinicService: PetclinicService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._petclinicService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Petclinic>(create ? [] : this.rows)
				.then(async (petclinics: Petclinic[]) => {
					if (create) {
						for (const petclinic of petclinics) {
							this._preCreate(petclinic);

							await firstValueFrom(
								this._petclinicService.create(petclinic)
							);
						}
					} else {
						for (const petclinic of this.rows) {
							if (
								!petclinics.find(
									(localPetclinic) =>
										localPetclinic._id === petclinic._id
								)
							) {
								await firstValueFrom(
									this._petclinicService.delete(petclinic)
								);
							}
						}

						for (const petclinic of petclinics) {
							const localPetclinic = this.rows.find(
								(localPetclinic) =>
									localPetclinic._id === petclinic._id
							);

							if (localPetclinic) {
								this._core.copy(petclinic, localPetclinic);

								await firstValueFrom(
									this._petclinicService.update(
										localPetclinic
									)
								);
							} else {
								this._preCreate(petclinic);

								await firstValueFrom(
									this._petclinicService.create(petclinic)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(petclinic: Petclinic): void {
		delete petclinic.__created;
	}
}
