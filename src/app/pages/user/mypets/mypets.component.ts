import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Value } from 'src/app/core/modules/input/input.component';
import { petFormComponents } from 'src/app/modules/pet/formcomponents/pet.formcomponents';
import { Pet } from 'src/app/modules/pet/interfaces/pet.interface';
import { PetService } from 'src/app/modules/pet/services/pet.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment.prod';
import { CoreService } from 'wacom';

@Component({
	templateUrl: './mypets.component.html',
	styleUrls: ['./mypets.component.scss'],
	standalone: false
})
export class MypetsComponent {
	mypets: Pet[] = [];

	apiUrl = environment.url;

	constructor(
		private _petService: PetService,
		private _form: FormService,
		public _userService: UserService,
		private _core: CoreService
	) {
		this._core.onComplete('pet_loaded').then(() => {
			this.mypets =
				this._petService.petsByAuthor[this._userService.user._id];
		});
	}

	isMenuOpen = false;

	species = '';
	breed = '';
	gender = '';
	adoptable = '';

	search = '';

	form: FormInterface = this._form.getForm('pet', petFormComponents);

	setSearch(value: Value): void {
		this.search = (value as string) || '';
	}

	create(): void {
		this._form.modal<Pet>(this.form, {
			label: 'Create',
			click: (created: unknown, close: () => void) => {
				this._petService.create(created as Pet);

				close();
			}
		});
	}

	load(): void {
		this._petService.get({ query: this._query() }).subscribe((mypets) => {
			this.mypets.splice(0, this.mypets.length);
			this.mypets.push(...mypets);
		});
	}

	private _query(): string {
		let query = '';

		if (this.species) {
			query += (query ? '&' : '') + 'species=' + this.species;
		}
		if (this.breed) {
			query += (query ? '&' : '') + 'breed=' + this.breed;
		}
		if (this.gender) {
			query += (query ? '&' : '') + 'gender=' + this.gender;
		}
		if (this.adoptable) {
			if (this.adoptable === 'Adoptable') {
				query += (query ? '&' : '') + 'adoptable=' + true;
			} else {
				query += (query ? '&' : '') + 'adoptable=' + false;
			}
		}
		if (this.search) {
			query += (query ? '&' : '') + 'search=' + this.search;
		}

		return query;
	}
}
