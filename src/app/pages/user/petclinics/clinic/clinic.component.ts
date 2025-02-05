import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { petclinicFormComponents } from 'src/app/modules/petclinic/formcomponents/petclinic.formcomponents';
import { Petclinic } from 'src/app/modules/petclinic/interfaces/petclinic.interface';
import { PetclinicService } from 'src/app/modules/petclinic/services/petclinic.service';
import { CoreService, AlertService } from 'wacom';

@Component({
	selector: 'app-clinic',
	standalone: false,

	templateUrl: './clinic.component.html',
	styleUrl: './clinic.component.scss'
})
export class ClinicComponent {
	@Input() clinics: Petclinic;

	@Output() load = new EventEmitter();

	constructor(
		private _petclinicService: PetclinicService,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	form: FormInterface = this._form.getForm(
		'petclinic',
		petclinicFormComponents
	);

	update(doc: Petclinic): void {
		this._form
			.modal<Petclinic>(this.form, [], doc)
			.then((updated: Petclinic) => {
				this._core.copy(updated, doc);

				this._petclinicService.update(doc);

				//TODO temporary code from here to
				const petclinic = this._petclinicService.doc(doc._id);
				this._core.copy(updated, petclinic);
				// here
			});
	}

	delete(doc: Petclinic): void {
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
						this._petclinicService.delete(doc).subscribe(() => {
							this.load.emit();
						});
					}
				}
			]
		});
	}
}
