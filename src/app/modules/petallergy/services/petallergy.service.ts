import { Injectable } from '@angular/core';
import { Petallergy } from '../interfaces/petallergy.interface';
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
export class PetallergyService extends CrudService<Petallergy> {
	petallergys: Petallergy[] = this.getDocs();

	petallergysByAuthor: Record<string, Petallergy[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'petallergy',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.petallergysByAuthor);
	}
}
