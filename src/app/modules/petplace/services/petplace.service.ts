import { Injectable } from '@angular/core';
import { Petplace } from '../interfaces/petplace.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class PetplaceService extends CrudService<Petplace> {
	constructor() {
		super({
			name: 'petplace'
		});
	}
}
