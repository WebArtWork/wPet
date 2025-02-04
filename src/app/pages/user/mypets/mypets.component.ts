import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petFormComponents } from 'src/app/modules/pet/formcomponents/pet.formcomponents';
import { Pet } from 'src/app/modules/pet/interfaces/pet.interface';
import { PetService } from 'src/app/modules/pet/services/pet.service';

@Component({
	templateUrl: './mypets.component.html',
	styleUrls: ['./mypets.component.scss'],
	standalone: false
})
export class MypetsComponent {
	get mypets(): Pet[] {
		return this._petService.pets;
	}
	constructor(
		private _petService: PetService,
		private _form: FormService,
	) { }

	isMenuOpen = false

	form: FormInterface = this._form.getForm('pet', petFormComponents);

	create(): void {
		this._form.modal<Pet>(this.form, {
			label: 'Create',
			click: (created: unknown, close: () => void) => {
				this._petService.create(created as Pet);

				close();
			}
		});
	}
}
