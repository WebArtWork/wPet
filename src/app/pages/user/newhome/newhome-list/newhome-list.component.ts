import { Component, Input } from '@angular/core';
import { Pet } from 'src/app/modules/pet/interfaces/pet.interface';

@Component({
  selector: 'app-newhome-list',
  standalone: false,
  
  templateUrl: './newhome-list.component.html',
  styleUrl: './newhome-list.component.scss'
})
export class NewhomeListComponent {
	@Input() pet: Pet;
}
