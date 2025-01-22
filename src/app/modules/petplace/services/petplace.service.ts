import { Injectable } from '@angular/core';
import { Petplace } from '../interfaces/petplace.interface';
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
export class PetplaceService extends CrudService<Petplace> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'petplace',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
