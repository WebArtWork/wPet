import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { petstoreFormComponents } from 'src/app/modules/petstore/formcomponents/petstore.formcomponents';
import { Petstore } from 'src/app/modules/petstore/interfaces/petstore.interface';
import { PetstoreService } from 'src/app/modules/petstore/services/petstore.service';
import { CoreService, AlertService } from 'wacom';

@Component({
	selector: 'app-store-list',
	standalone: false,

	templateUrl: './store-list.component.html',
	styleUrl: './store-list.component.scss'
})
export class StoreListComponent {
	@Input() store: Petstore;

	@Output() load = new EventEmitter();

	constructor(
		private _petstoreService: PetstoreService,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	form: FormInterface = this._form.getForm(
		'petstore',
		petstoreFormComponents
	);

	update(doc: Petstore): void {
		this._form
			.modal<Petstore>(this.form, [], doc)
			.then((updated: Petstore) => {
				this._core.copy(updated, doc);

				this._petstoreService.update(doc);

				//TODO temporary code from here to
				const petdoctor = this._petstoreService.doc(doc._id);
				this._core.copy(updated, petdoctor);
				// here
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
						this._petstoreService.delete(doc).subscribe(() => {
							this.load.emit();
						});
					}
				}
			]
		});
	}
}
