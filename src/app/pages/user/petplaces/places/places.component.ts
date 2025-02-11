import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { petplaceFormComponents } from 'src/app/modules/petplace/formcomponents/petplace.formcomponents';
import { Petplace } from 'src/app/modules/petplace/interfaces/petplace.interface';
import { PetplaceService } from 'src/app/modules/petplace/services/petplace.service';
import { CoreService, AlertService } from 'wacom';

@Component({
	selector: 'app-places',
	standalone: false,

	templateUrl: './places.component.html',
	styleUrl: './places.component.scss'
})
export class PlacesComponent {
	@Input() places: Petplace;

	@Output() load = new EventEmitter();

	constructor(
		private _petplaceService: PetplaceService,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	form: FormInterface = this._form.getForm(
		'petplace',
		petplaceFormComponents
	);

	update(doc: Petplace): void {
		this._form
			.modal<Petplace>(this.form, [], doc)
			.then((updated: Petplace) => {
				this._core.copy(updated, doc);

				this._petplaceService.update(doc);

				//TODO temporary code from here to
				const petplace = this._petplaceService.doc(doc._id);
				this._core.copy(updated, petplace);
				// here
			});
	}

	delete(doc: Petplace): void {
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
						this._petplaceService.delete(doc).subscribe(() => {
							this.load.emit();
						});
					}
				}
			]
		});
	}
}
