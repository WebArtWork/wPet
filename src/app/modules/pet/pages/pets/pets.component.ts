import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../interfaces/pet.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petFormComponents } from '../../formcomponents/pet.formcomponents';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './pets.component.html',
	styleUrls: ['./pets.component.scss'],
	standalone: false
})
export class PetsComponent {
	columns = [
		'name',
		'species',
		'breed',
		'age',
		'gender',
		'adoptable',
		'description'
	];

	form: FormInterface = this._form.getForm('pet', petFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Pet>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Pet);

					this._petService.create(created as Pet);

					close();
				}
			});
		},
		update: (doc: Pet): void => {
			this._form.modal<Pet>(this.form, [], doc).then((updated: Pet) => {
				this._core.copy(updated, doc);

				this._petService.update(doc);
			});
		},
		delete: (doc: Pet): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this pet?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._petService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'article',
				hrefFunc: (doc: Pet): string => {
					return '/records/' + doc._id;
				}
			},
			{
				icon: 'report_problem',
				hrefFunc: (doc: Pet): string => {
					return '/allergies/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Pet): void => {
					this._form.modalUnique<Pet>('pet', 'url', doc);
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

	get rows(): Pet[] {
		return this._petService.petsByAuthor[this._userService.user._id];
	}

	constructor(
		private _translate: TranslateService,
		private _petService: PetService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _userService: UserService
	) {
		// this.rows = this._petService.petsByAuthor[this._userService.user._id];
	}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Pet>(create ? [] : this.rows)
				.then((pets: Pet[]) => {
					if (create) {
						for (const pet of pets) {
							this._preCreate(pet);

							this._petService.create(pet);
						}
					} else {
						for (const pet of this.rows) {
							if (
								!pets.find(
									(localPet) => localPet._id === pet._id
								)
							) {
								this._petService.delete(pet);
							}
						}

						for (const pet of pets) {
							const localPet = this.rows.find(
								(localPet) => localPet._id === pet._id
							);

							if (localPet) {
								this._core.copy(pet, localPet);

								this._petService.update(localPet);
							} else {
								this._preCreate(pet);

								this._petService.create(pet);
							}
						}
					}
				});
		};
	}

	private _preCreate(pet: Pet): void {
		delete pet.__created;
	}
}
