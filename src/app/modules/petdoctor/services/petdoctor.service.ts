import { Injectable } from '@angular/core';
import { Petdoctor } from '../interfaces/petdoctor.interface';
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
export class PetdoctorService extends CrudService<Petdoctor> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'petdoctor',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
