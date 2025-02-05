import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petstoreFormComponents } from 'src/app/modules/petstore/formcomponents/petstore.formcomponents';
import { Petstore } from 'src/app/modules/petstore/interfaces/petstore.interface';
import { PetstoreService } from 'src/app/modules/petstore/services/petstore.service';

@Component({
	templateUrl: './petstore.component.html',
	styleUrls: ['./petstore.component.scss'],
	standalone: false
})
export class PetstoreComponent {
	stores: Petstore[] = [];

	isMenuOpen = false;

	constructor(
		private _petstoreService: PetstoreService,
		private _form: FormService
	) {
		this.load();
	}

	form: FormInterface = this._form.getForm(
		'petstore',
		petstoreFormComponents
	);

	create(): void {
		this._form.modal<Petstore>(this.form, {
			label: 'Create',
			click: async (created: unknown, close: () => void) => {
				close();

				this._preCreate(created as Petstore);

				this._petstoreService
					.create(created as Petstore)
					.subscribe(() => {
						this.load();
					});
			}
		});
	}

	load(): void {
		this._petstoreService
			.get({}, { name: 'public' })
			.subscribe((stores) => {
				this.stores.splice(0, this.stores.length);

				this.stores.push(...stores);
			});
	}

	private _preCreate(petstores: Petstore): void {
		delete petstores.__created;
	}
}
