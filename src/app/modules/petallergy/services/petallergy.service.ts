import { Injectable } from '@angular/core';
import { Petallergy } from '../interfaces/petallergy.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class PetallergyService extends CrudService<Petallergy> {
	petallergys: Petallergy[] = this.getDocs();

	petallergysByAuthor: Record<string, Petallergy[]> = {};

	constructor() {
		super({
			name: 'petallergy'
		});

		this.get();

		this.filteredDocuments(this.petallergysByAuthor);
	}
}
