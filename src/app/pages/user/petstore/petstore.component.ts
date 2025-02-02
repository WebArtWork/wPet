import { Component } from '@angular/core';
import { Petstore } from 'src/app/modules/petstore/interfaces/petstore.interface';
import { PetstoreService } from 'src/app/modules/petstore/services/petstore.service';

@Component({
	templateUrl: './petstore.component.html',
	styleUrls: ['./petstore.component.scss'],
	standalone: false
})
export class PetstoreComponent {
	stores: Petstore[] = [];

	isMenuOpen = false;
	constructor(private _petstoreService: PetstoreService) {}

	ngOnInit(): void {
		this._petstoreService
			.get({}, { name: 'public' })
			.subscribe((stores) => {
				this.stores = stores;
			});
	}
}
