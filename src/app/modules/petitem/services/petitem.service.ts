import { Injectable } from '@angular/core';
import { Petitem } from '../interfaces/petitem.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class PetitemService extends CrudService<Petitem> {
	petitems: Petitem[] = this.getDocs();
	constructor() {
		super({
			name: 'petitem'
		});
	}
}
