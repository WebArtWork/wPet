import { Injectable } from '@angular/core';
import { Petdrug } from '../interfaces/petdrug.interface';
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
export class PetdrugService extends CrudService<Petdrug> {
	petdrugs: Petdrug[] = this.getDocs();
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'petdrug'
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
