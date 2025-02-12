import { Injectable } from '@angular/core';
import { Petlink } from '../interfaces/petlink.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class PetlinkService extends CrudService<Petlink> {
	petlinks: Petlink[] = this.getDocs();
	constructor() {
		super({
			name: 'petlink'
		});
	}
}
