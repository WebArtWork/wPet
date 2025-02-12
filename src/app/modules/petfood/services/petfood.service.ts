import { Injectable } from '@angular/core';
import { Petfood } from '../interfaces/petfood.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class PetfoodService extends CrudService<Petfood> {
	petfoods: Petfood[] = this.getDocs();
	constructor() {
		super({
			name: 'petfood'
		});
	}
}
