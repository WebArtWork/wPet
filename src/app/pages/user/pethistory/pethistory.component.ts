import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { petrecordFormComponents } from 'src/app/modules/petrecord/formcomponents/petrecord.formcomponents';
import { Petrecord } from 'src/app/modules/petrecord/interfaces/petrecord.interface';
import { PetrecordService } from 'src/app/modules/petrecord/services/petrecord.service';

@Component({
	templateUrl: './pethistory.component.html',
	styleUrls: ['./pethistory.component.scss'],
	standalone: false
})
export class PethistoryComponent {
	records: Petrecord[] = [];

	isMenuOpen = false;

	pet_id = '';

	constructor(
		private _petrecordService: PetrecordService,
		private _route: ActivatedRoute,
		private _form: FormService
	) {
		this._route.paramMap.subscribe((params) => {
			this.pet_id = params.get('pet_id') || '';
			this.load();
		});
	}

	form: FormInterface = this._form.getForm(
		'petrecord',
		petrecordFormComponents
	);

	create(): void {
		this._form.modal<Petrecord>(this.form, {
			label: 'Create',
			click: async (created: unknown, close: () => void) => {
				close();

				this._preCreate(created as Petrecord);

				this._petrecordService
					.create(created as Petrecord)
					.subscribe(() => {
						this.load();
					});
			}
		});
	}

	load(): void {
		this._petrecordService
			.get({ page: 1, query: this._query() })
			.subscribe((records) => {
				this.records.splice(0, this.records.length);

				this.records.push(...records);
			});
	}

	private _query(): string {
		let query = '';

		if (this.pet_id) {
			query += (query ? '&' : '') + 'pet=' + this.pet_id;
		}

		return query;
	}

	private _preCreate(petrecord: Petrecord): void {
		delete petrecord.__created;

		if (this.pet_id) {
			petrecord.pet = this.pet_id;
		}
	}
}
