import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PetlinkService } from '../../services/petlink.service';
import { Petlink } from '../../interfaces/petlink.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petlinkFormComponents } from '../../formcomponents/petlink.formcomponents';
import { firstValueFrom } from 'rxjs';

import { PetclinicService } from 'src/app/modules/petclinic/services/petclinic.service';
import { PetstoreService } from 'src/app/modules/petstore/services/petstore.service';
import { PetplaceService } from 'src/app/modules/petplace/services/petplace.service';
import { PetdrugService } from 'src/app/modules/petdrug/services/petdrug.service';
import { PetfoodService } from 'src/app/modules/petfood/services/petfood.service';
import { PetitemService } from 'src/app/modules/petitem/services/petitem.service';
import { Petclinic } from 'src/app/modules/petclinic/interfaces/petclinic.interface';
import { Petstore } from 'src/app/modules/petstore/interfaces/petstore.interface';
import { Petplace } from 'src/app/modules/petplace/interfaces/petplace.interface';
import { Petdrug } from 'src/app/modules/petdrug/interfaces/petdrug.interface';
import { Petfood } from 'src/app/modules/petfood/interfaces/petfood.interface';
import { Petitem } from 'src/app/modules/petitem/interfaces/petitem.interface';
// import { FormComponentInterface } from 'src/app/core/modules/form/interfaces/component.interface';

@Component({
	templateUrl: './links.component.html',
	styleUrls: ['./links.component.scss'],
	standalone: false
})
export class LinksComponent {
	columns = ['clinic', 'store', 'place', 'drug', 'food', 'item'];

	form: FormInterface = this._form.getForm('petlink', petlinkFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._petlinkService.setPerPage.bind(this._petlinkService),
		allDocs: false,
		create: (): void => {
			const submition = {};
			this._form.modal<Petlink>(
				this.form,
				{
					label: 'Create',
					click: async (created: unknown, close: () => void) => {
						close();

						this._preCreate(created as Petlink);

						await firstValueFrom(
							this._petlinkService.create(created as Petlink)
						);

						this.setRows();
					}
				},
				submition,
				(change: Petlink) => {
					/*const selectedType = change.type;

					console.log(submition);
					console.log(selectedType);

					const selectClinic = this._form.getComponent(
						this.form,
						'clinic'
					) as FormComponentInterface;
					const selectStore = this._form.getComponent(
						this.form,
						'store'
					) as FormComponentInterface;
					const selectPlace = this._form.getComponent(
						this.form,
						'place'
					) as FormComponentInterface;
					const selectDrug = this._form.getComponent(
						this.form,
						'drug'
					) as FormComponentInterface;
					const selectFood = this._form.getComponent(
						this.form,
						'food'
					) as FormComponentInterface;
					const selectItem = this._form.getComponent(
						this.form,
						'item'
					) as FormComponentInterface;

					switch (selectedType) {
						case 'Clinic':
							selectClinic.hidden = false;
							selectStore.hidden = true;
							selectPlace.hidden = false;
							selectDrug.hidden = false;
							selectFood.hidden = true;
							selectItem.hidden = true;
							break;
						case 'Store':
							selectClinic.hidden = true;
							selectStore.hidden = false;
							selectPlace.hidden = false;
							selectDrug.hidden = true;
							selectFood.hidden = false;
							selectItem.hidden = false;
							break;
						default:
							selectClinic.hidden = false;
							selectStore.hidden = false;
							selectPlace.hidden = false;
							selectDrug.hidden = false;
							selectFood.hidden = false;
							selectItem.hidden = false;
							break;
					}*/
				}
			);
		},
		update: (doc: Petlink): void => {
			this._form
				.modal<Petlink>(this.form, [], doc)
				.then((updated: Petlink) => {
					this._core.copy(updated, doc);

					this._petlinkService.update(doc);
				});
		},
		delete: (doc: Petlink): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this petlink?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._petlinkService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
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

	rows: Petlink[] = [];

	constructor(
		private _translate: TranslateService,
		private _petlinkService: PetlinkService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,

		private _petclinicService: PetclinicService,
		private _petstoreService: PetstoreService,
		private _petplaceService: PetplaceService,
		private _petdrugService: PetdrugService,
		private _petfoodService: PetfoodService,
		private _petitemService: PetitemService
	) {
		this._petclinicService.get().subscribe((clinics) => {
			const currentClinic = petlinkFormComponents.components[1].fields[2]
				.value as Array<Petclinic>;
			currentClinic.splice(0, currentClinic.length);
			currentClinic.push(...clinics);
		});

		this._petstoreService.get().subscribe((stores) => {
			const currentStore = petlinkFormComponents.components[2].fields[2]
				.value as Array<Petstore>;
			currentStore.splice(0, currentStore.length);
			currentStore.push(...stores);
		});

		this._petplaceService.get().subscribe((places) => {
			const currentPlace = petlinkFormComponents.components[3].fields[2]
				.value as Array<Petplace>;
			currentPlace.splice(0, currentPlace.length);
			currentPlace.push(...places);
		});
		this._petdrugService.get().subscribe((drugs) => {
			const currentDrugs = petlinkFormComponents.components[4].fields[2]
				.value as Array<Petdrug>;
			currentDrugs.splice(0, currentDrugs.length);
			currentDrugs.push(...drugs);
		});

		this._petfoodService.get().subscribe((food) => {
			const currentFood = petlinkFormComponents.components[5].fields[2]
				.value as Array<Petfood>;
			currentFood.splice(0, currentFood.length);
			currentFood.push(...food);
		});

		this._petitemService.get().subscribe((items) => {
			const currentItems = petlinkFormComponents.components[6].fields[2]
				.value as Array<Petitem>;
			currentItems.splice(0, currentItems.length);
			currentItems.push(...items);
		});

		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._petlinkService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Petlink>(create ? [] : this.rows)
				.then(async (petlinks: Petlink[]) => {
					if (create) {
						for (const petlink of petlinks) {
							this._preCreate(petlink);

							await firstValueFrom(
								this._petlinkService.create(petlink)
							);
						}
					} else {
						for (const petlink of this.rows) {
							if (
								!petlinks.find(
									(localPetlink) =>
										localPetlink._id === petlink._id
								)
							) {
								await firstValueFrom(
									this._petlinkService.delete(petlink)
								);
							}
						}

						for (const petlink of petlinks) {
							const localPetlink = this.rows.find(
								(localPetlink) =>
									localPetlink._id === petlink._id
							);

							if (localPetlink) {
								this._core.copy(petlink, localPetlink);

								await firstValueFrom(
									this._petlinkService.update(localPetlink)
								);
							} else {
								this._preCreate(petlink);

								await firstValueFrom(
									this._petlinkService.create(petlink)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(petlink: Petlink): void {
		delete petlink.__created;
	}
}
