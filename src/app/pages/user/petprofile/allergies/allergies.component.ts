import { Component, Input } from '@angular/core';
import { Pet } from 'src/app/modules/pet/interfaces/pet.interface';
import { PetService } from 'src/app/modules/pet/services/pet.service';

@Component({
	selector: 'app-allergies',
	standalone: false,
	templateUrl: './allergies.component.html',
	styleUrl: './allergies.component.scss'
})
export class AllergiesComponent {
	@Input() petallergy: Pet;

	constructor(private _petService: PetService) {}

	allergy = '';

	ngOnInit() {
		//this.allergy = this._petService.doc(this.petallergy._id);
	}
}
