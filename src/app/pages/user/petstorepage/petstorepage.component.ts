import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { petstoreFormComponents } from 'src/app/modules/petstore/formcomponents/petstore.formcomponents';
import { Petstore } from 'src/app/modules/petstore/interfaces/petstore.interface';
import { PetstoreService } from 'src/app/modules/petstore/services/petstore.service';
import { CoreService, AlertService } from 'wacom';

@Component({
	templateUrl: './petstorepage.component.html',
	styleUrls: ['./petstorepage.component.scss'],
	standalone: false
})
export class PetstorepageComponent {
	petstore = this._petstoreService.doc(
		this._router.url.replace('/petstorepage/', '')
	);

	constructor(
		private _petstoreService: PetstoreService,
		private _router: Router,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	isMenuOpen = false

	form: FormInterface = this._form.getForm('pet', petstoreFormComponents);
	
	
		update(doc: Petstore): void {
			this._form.modal<Petstore>(this.form, [], doc).then((updated: Petstore) => {
				this._core.copy(updated, doc);
	
				this._petstoreService.update(doc);
			});
		}
	
		delete(doc: Petstore): void {
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
							this._petstoreService.delete(doc);
							this._router.navigateByUrl('/petstore')
						}
					}
				]
			});
		}
}
