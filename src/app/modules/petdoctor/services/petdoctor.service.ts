import { Injectable } from '@angular/core';
import { Petdoctor } from '../interfaces/petdoctor.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class PetdoctorService extends CrudService<Petdoctor> {
	constructor() {
		super({
			name: 'petdoctor'
		});
	}
}
