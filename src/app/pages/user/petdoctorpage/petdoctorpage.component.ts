import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { petdoctorFormComponents } from 'src/app/modules/petdoctor/formcomponents/petdoctor.formcomponents';
import { Petdoctor } from 'src/app/modules/petdoctor/interfaces/petdoctor.interface';
import { PetdoctorService } from 'src/app/modules/petdoctor/services/petdoctor.service';
import { CoreService, AlertService } from 'wacom';

@Component({
	templateUrl: './petdoctorpage.component.html',
	styleUrls: ['./petdoctorpage.component.scss'],
	standalone: false
})
export class PetdoctorpageComponent {
	petdoctor = this._petdoctorService.doc(
		this._router.url.replace('/petdoctorpage/', '')
	);

	constructor(
		private _petdoctorService: PetdoctorService,
		private _router: Router,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	isMenuOpen = false;

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
						this._petdoctorService.delete(doc);
						this._router.navigateByUrl('/petdoctors');
					}
				}
			]
		});
	}
}
