import { Component, Input } from '@angular/core';
import { Petstore } from 'src/app/modules/petstore/interfaces/petstore.interface';

@Component({
	selector: 'app-store-list',
	standalone: false,

	templateUrl: './store-list.component.html',
	styleUrl: './store-list.component.scss'
})
export class StoreListComponent {
	@Input() store: Petstore;
}
