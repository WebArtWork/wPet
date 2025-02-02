import { Injectable } from '@angular/core';
import { Petclinic } from '../interfaces/petclinic.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class PetclinicService extends CrudService<Petclinic> {
	petclinics: Petclinic[];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'petclinic'
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
