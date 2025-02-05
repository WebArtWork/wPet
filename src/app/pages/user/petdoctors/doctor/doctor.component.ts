import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { petdoctorFormComponents } from 'src/app/modules/petdoctor/formcomponents/petdoctor.formcomponents';
import { Petdoctor } from 'src/app/modules/petdoctor/interfaces/petdoctor.interface';
import { PetdoctorService } from 'src/app/modules/petdoctor/services/petdoctor.service';
import { AlertService, CoreService } from 'wacom';

@Component({
	selector: 'app-doctor',
	standalone: false,

	templateUrl: './doctor.component.html',
	styleUrl: './doctor.component.scss'
})
export class DoctorComponent {
	@Input() doctor: Petdoctor;

	@Output() load = new EventEmitter();

	constructor(
		private _translate: TranslateService,
		private _petdoctorService: PetdoctorService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	form: FormInterface = this._form.getForm(
		'petdoctor',
		petdoctorFormComponents
	);

	update(doc: Petdoctor): void {
		this._form
			.modal<Petdoctor>(this.form, [], doc)
			.then((updated: Petdoctor) => {
				this._core.copy(updated, doc);

				this._petdoctorService.update(doc);

				//TODO temporary code from here to
				const petdoctor = this._petdoctorService.doc(doc._id);
				this._core.copy(updated, petdoctor);
				// here
			});
	}

	delete(doc: Petdoctor): void {
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
						this._petdoctorService.delete(doc).subscribe(() => {
							this.load.emit();
						});
					}
				}
			]
		});
	}
}
