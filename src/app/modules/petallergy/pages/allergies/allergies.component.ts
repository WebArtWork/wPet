import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PetallergyService } from '../../services/petallergy.service';
import { Petallergy } from '../../interfaces/petallergy.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petallergyFormComponents } from '../../formcomponents/petallergy.formcomponents';
import { Route, Router } from '@angular/router';

@Component({
	templateUrl: './allergies.component.html',
	styleUrls: ['./allergies.component.scss'],
	standalone: false
})
export class AllergiesComponent {
	pet_id = this._router.url.includes('allergies/')
		? this._router.url.replace('/allergies/', '')
		: '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'petallergy',
		petallergyFormComponents
	);

	config = {
		create: (): void => {
			this._form.modal<Petallergy>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Petallergy);

					this._petallergyService.create(created as Petallergy);

					close();
				}
			});
		},
		update: (doc: Petallergy): void => {
			this._form
				.modal<Petallergy>(this.form, [], doc)
				.then((updated: Petallergy) => {
					this._core.copy(updated, doc);

					this._petallergyService.update(doc);
				});
		},
		delete: (doc: Petallergy): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this petallergy?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._petallergyService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Petallergy): void => {
					this._form.modalUnique<Petallergy>(
						'petallergy',
						'url',
						doc
					);
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

	get rows(): Petallergy[] {
		return this._petallergyService.petallergys;
	}

	constructor(
		private _translate: TranslateService,
		private _petallergyService: PetallergyService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Petallergy>(create ? [] : this.rows)
				.then((petallergys: Petallergy[]) => {
					if (create) {
						for (const petallergy of petallergys) {
							this._preCreate(petallergy);

							this._petallergyService.create(petallergy);
						}
					} else {
						for (const petallergy of this.rows) {
							if (
								!petallergys.find(
									(localPetallergy) =>
										localPetallergy._id === petallergy._id
								)
							) {
								this._petallergyService.delete(petallergy);
							}
						}

						for (const petallergy of petallergys) {
							const localPetallergy = this.rows.find(
								(localPetallergy) =>
									localPetallergy._id === petallergy._id
							);

							if (localPetallergy) {
								this._core.copy(petallergy, localPetallergy);

								this._petallergyService.update(localPetallergy);
							} else {
								this._preCreate(petallergy);

								this._petallergyService.create(petallergy);
							}
						}
					}
				});
		};
	}

	private _preCreate(petallergy: Petallergy): void {
		delete petallergy.__created;

		if (this.pet_id) {
			petallergy.pet = this.pet_id;
		}
	}
}
