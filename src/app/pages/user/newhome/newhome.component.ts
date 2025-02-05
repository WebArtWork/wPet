import { Component } from '@angular/core';
import { Pet } from 'src/app/modules/pet/interfaces/pet.interface';
import { PetService } from 'src/app/modules/pet/services/pet.service';

@Component({
	templateUrl: './newhome.component.html',
	styleUrls: ['./newhome.component.scss'],
	standalone: false
})
export class NewhomeComponent {
	availablePets: Pet[] = [];

	isMenuOpen = false;

	constructor(private _petService: PetService) {
		this.load();
	}

	load(): void {
		this._petService
			.get({}, { name: 'public' })
			.subscribe((availablePets) => {
				this.availablePets.splice(0, this.availablePets.length);

				const adoptablePets = availablePets.filter(
					(pet) => pet.adoptable
				);

				this.availablePets.push(...adoptablePets);
			});
	}
}
