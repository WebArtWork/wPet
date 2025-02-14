import { Component } from '@angular/core';
import { Value } from 'src/app/core/modules/input/input.component';
import { Pet } from 'src/app/modules/pet/interfaces/pet.interface';
import { PetService } from 'src/app/modules/pet/services/pet.service';

@Component({
	templateUrl: './newhome.component.html',
	styleUrls: ['./newhome.component.scss'],
	standalone: false
})
export class NewhomeComponent {
	availablePets: Pet[] = [];

	species = '';
	breed = '';
	gender = '';
	search = '';

	isMenuOpen = false;

	constructor(private _petService: PetService) {
		this.load();
	}

	setSearch(value: Value): void {
		this.search = (value as string) || '';
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

			if (this.species) {
				query += (query ? '&' : '') + 'species=' + this.species;
			}
			if (this.breed) {
				query += (query ? '&' : '') + 'breed=' + this.breed;
			}
			if (this.gender) {
				query += (query ? '&' : '') + 'gender=' + this.gender;
			}
		}

		if (this.search) {
			query += (query ? '&' : '') + 'search=' + this.search;
		}

		return query;
	}
}
