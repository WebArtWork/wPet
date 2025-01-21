import { Injectable } from '@angular/core';
import { Petrecord } from '../interfaces/petrecord.interface';
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
export class PetrecordService extends CrudService<Petrecord> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'petrecord',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
