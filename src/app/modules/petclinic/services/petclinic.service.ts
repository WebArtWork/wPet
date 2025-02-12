import { Injectable } from '@angular/core';
import { Petclinic } from '../interfaces/petclinic.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class PetclinicService extends CrudService<Petclinic> {
	petclinics: Petclinic[] = this.getDocs();
	constructor() {
		super({
			name: 'petclinic'
		});
	}
}
