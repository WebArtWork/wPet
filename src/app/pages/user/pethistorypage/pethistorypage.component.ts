import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { petrecordFormComponents } from 'src/app/modules/petrecord/formcomponents/petrecord.formcomponents';
import { Petrecord } from 'src/app/modules/petrecord/interfaces/petrecord.interface';
import { PetrecordService } from 'src/app/modules/petrecord/services/petrecord.service';
import { CoreService, AlertService } from 'wacom';

@Component({
	templateUrl: './pethistorypage.component.html',
	styleUrls: ['./pethistorypage.component.scss'],
	standalone: false
})
export class PethistorypageComponent {
	petrecord = this._petrecordService.doc(
		this._router.url.replace('/pethistorypage/', '')
	);

	constructor(
		private _petrecordService: PetrecordService,
		private _router: Router,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	isMenuOpen = false;

	form: FormInterface = this._form.getForm(
		'petrecord',
		petrecordFormComponents
	);

	update(doc: Petrecord): void {
		this._form
			.modal<Petrecord>(this.form, [], doc)
			.then((updated: Petrecord) => {
				this._core.copy(updated, doc);

				this._petrecordService.update(doc);
			});
	}

	delete(doc: Petrecord): void {
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
						this._petrecordService.delete(doc);
						this._router.navigateByUrl('/pethistory/' + doc.pet);
					}
				}
			]
		});
	}
}
