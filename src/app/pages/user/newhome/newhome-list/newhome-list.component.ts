import { Component, Input } from '@angular/core';
import { Pet } from 'src/app/modules/pet/interfaces/pet.interface';
import { environment } from 'src/environments/environment.prod';

@Component({
	selector: 'app-newhome-list',
	standalone: false,

	templateUrl: './newhome-list.component.html',
	styleUrl: './newhome-list.component.scss'
})
export class NewhomeListComponent {
	@Input() pet: Pet;

	apiUrl = environment.url;
}
