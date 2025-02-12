import { Injectable } from '@angular/core';
import { CoreService, CrudService, CrudDocument } from 'wacom';

export interface CustomformcomponnetfieldInterface {
	name: string;
	value: string;
}

export interface CustomformcomponnetInterface {
	name: string;
	fields: CustomformcomponnetfieldInterface[];
	key?: string;
	components?: CustomformcomponnetInterface[];
	root?: boolean;
}

export interface Customform extends CrudDocument {
	name: string;
	class: string;
	fields: CustomformcomponnetfieldInterface[];
	components: CustomformcomponnetInterface[];
	key?: string;
	active?: boolean;
	formId?: string;
}

@Injectable({
	providedIn: 'root'
})
export class CustomformService extends CrudService<Customform> {
	customforms: Customform[] = [];

	constructor(_core: CoreService) {
		super({
			name: 'form'
		});

		this.get().subscribe((customforms: Customform[]) =>
			this.customforms.push(...customforms)
		);

		_core.on('customform_create').subscribe((customform: Customform) => {
			this.customforms.push(customform);
		});

		_core.on('customform_delete').subscribe((customform: Customform) => {
			this.customforms.splice(
				this.customforms.findIndex((o) => o._id === customform._id),
				1
			);
		});
	}
}
