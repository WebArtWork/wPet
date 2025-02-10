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
			.get({ query: this._query() }, { name: 'public' })
			.subscribe((availablePets) => {
				this.availablePets.splice(0, this.availablePets.length);
				this.availablePets.push(...availablePets);
			});
	}

	private _query(): string {
		let query = '';

		if (this.availablePets) {
			query += (query ? '&' : '') + 'adoptable=' + true;
		}
		return query;
	}
}
