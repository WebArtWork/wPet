import { Component } from '@angular/core';
import { Pet } from 'src/app/modules/pet/interfaces/pet.interface';
import { PetService } from 'src/app/modules/pet/services/pet.service';

@Component({
	templateUrl: './newhome.component.html',
	styleUrls: ['./newhome.component.scss'],
	standalone: false
})
export class NewhomeComponent {
	// get mypets(): Pet[] {
	// 	return this._petService.pets;
	// }

	availablePets: Pet[] = [];

	isMenuOpen = false

	constructor(private _petService: PetService) {}

	ngOnInit(): void {
		this._petService.get().subscribe(pets => {
		  this.availablePets = pets.filter(pet => pet.adoptable);
		});
	  }
}