import { Component, Input, input } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { petFormComponents } from 'src/app/modules/pet/formcomponents/pet.formcomponents';
import { Pet } from 'src/app/modules/pet/interfaces/pet.interface';
import { PetService } from 'src/app/modules/pet/services/pet.service';
import { CoreService, AlertService } from 'wacom';
import { environment } from 'src/environments/environment.prod';

@Component({
	selector: 'app-pet',
	standalone: false,

	templateUrl: './pet.component.html',
	styleUrl: './pet.component.scss'
})
export class PetComponent {
	@Input() pet: Pet;

	apiUrl = environment.url;

	constructor(
		private _petService: PetService,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	form: FormInterface = this._form.getForm('pet', petFormComponents);

	update(doc: Pet): void {
		this._form.modal<Pet>(this.form, [], doc).then((updated: Pet) => {
			this._core.copy(updated, doc);

			this._petService.update(doc);
		});
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
					}
				}
			]
		});
	}
}
