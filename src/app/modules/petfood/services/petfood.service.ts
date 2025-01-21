import { Injectable } from '@angular/core';
import { Petfood } from '../interfaces/petfood.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class PetfoodService extends CrudService<Petfood> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'petfood',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
