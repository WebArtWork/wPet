import { Injectable } from '@angular/core';
import { Petdrug } from '../interfaces/petdrug.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class PetdrugService extends CrudService<Petdrug> {
	petdrugs: Petdrug[] = this.getDocs();
	constructor() {
		super({
			name: 'petdrug'
		});
	}
}
