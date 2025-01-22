import { Injectable } from '@angular/core';
import { Petstore } from '../interfaces/petstore.interface';
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
export class PetstoreService extends CrudService<Petstore> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'petstore',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
