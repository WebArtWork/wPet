import { Injectable } from '@angular/core';
import { Pet } from '../interfaces/pet.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class PetService extends CrudService<Pet> {
	pets: Pet[] = this.getDocs();

	petsByAuthor: Record<string, Pet[]> = {};

	constructor() {
		super({
			name: 'pet'
		});

		this.get();

		this.filteredDocuments(this.petsByAuthor);
	}
}
