import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { petFormComponents } from 'src/app/modules/pet/formcomponents/pet.formcomponents';
import { Pet } from 'src/app/modules/pet/interfaces/pet.interface';
import { PetService } from 'src/app/modules/pet/services/pet.service';
import { Petallergy } from 'src/app/modules/petallergy/interfaces/petallergy.interface';
import { CoreService, AlertService } from 'wacom';

@Component({
	templateUrl: './petprofile.component.html',
	styleUrls: ['./petprofile.component.scss'],
	standalone: false
})
export class PetprofileComponent {
	petprofile = this._petService.doc(
		this._router.url.replace('/petprofile/', '')
	);

	allergies: Petallergy[] = [];

	allergy = [];

	constructor(
		private _petService: PetService,
		private _router: Router,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	isMenuOpen = false;

	form: FormInterface = this._form.getForm('pet', petFormComponents);

	update(doc: Pet): void {
		this._form.modal<Pet>(this.form, [], doc).then((updated: Pet) => {
			this._core.copy(updated, doc);

			this._petService.update(doc);
		});
	}

	updateAllergies(doc: Pet): void {
		// Оновлюємо поле allergies на новий масив
		doc.allergies = this.allergy;

		// Викликаємо сервіс для оновлення даних в базі
		this._petService.update(doc);
	}

	delete(doc: Pet): void {
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
						this._router.navigateByUrl('/mypets');
					}
				}
			]
		});
	}
}
