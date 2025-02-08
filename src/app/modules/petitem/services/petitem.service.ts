import { Injectable } from '@angular/core';
import { Petitem } from '../interfaces/petitem.interface';
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
export class PetitemService extends CrudService<Petitem> {
	petitems: Petitem[] = this.getDocs();
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'petitem'
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
