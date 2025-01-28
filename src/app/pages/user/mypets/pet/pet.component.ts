import { Component, Input, input } from '@angular/core';
import { Pet } from 'src/app/modules/pet/interfaces/pet.interface';

@Component({
	selector: 'app-pet',
	standalone: false,

	templateUrl: './pet.component.html',
	styleUrl: './pet.component.scss'
})
export class PetComponent {
	@Input() pet: Pet;
}
