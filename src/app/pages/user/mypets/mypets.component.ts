import { Component } from '@angular/core';
import { Pet } from 'src/app/modules/pet/interfaces/pet.interface';
import { PetService } from 'src/app/modules/pet/services/pet.service';

@Component({
	templateUrl: './mypets.component.html',
	styleUrls: ['./mypets.component.scss'],
	standalone: false
})
export class MypetsComponent {
	get mypets(): Pet[] {
		return this._petService.pets;
	}

	constructor(private _petService: PetService) {}
}
