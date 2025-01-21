import { Injectable } from '@angular/core';
import { Pet } from '../interfaces/pet.interface';
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
export class PetService extends CrudService<Pet> {
	pets: Pet[] = this.getDocs();

	petsByAuthor: Record<string, Pet[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'pet',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.petsByAuthor);
	}
}
