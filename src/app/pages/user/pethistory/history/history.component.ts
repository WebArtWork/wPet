import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { petrecordFormComponents } from 'src/app/modules/petrecord/formcomponents/petrecord.formcomponents';
import { Petrecord } from 'src/app/modules/petrecord/interfaces/petrecord.interface';
import { PetrecordService } from 'src/app/modules/petrecord/services/petrecord.service';
import { AlertService, CoreService } from 'wacom';

@Component({
	selector: 'app-history',
	standalone: false,

	templateUrl: './history.component.html',
	styleUrl: './history.component.scss'
})
export class HistoryComponent {
	@Input() record: Petrecord;

	@Output() load = new EventEmitter();

	constructor(
		private _translate: TranslateService,
		private _petrecordService: PetrecordService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

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

				//TODO temporary code from here to
				const petrecord = this._petrecordService.doc(doc._id);
				this._core.copy(updated, petrecord);
				// here
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
						this._petrecordService.delete(doc).subscribe(() => {
							this.load.emit();
						});
					}
				}
			]
		});
	}
}
