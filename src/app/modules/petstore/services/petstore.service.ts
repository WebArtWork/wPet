import { Injectable } from '@angular/core';
import { Petstore } from '../interfaces/petstore.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class PetstoreService extends CrudService<Petstore> {
	constructor() {
		super({
			name: 'petstore'
		});
	}
}
