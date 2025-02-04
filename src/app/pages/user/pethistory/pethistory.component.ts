import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

	constructor(private _petrecordService: PetrecordService, private _route: ActivatedRoute) {
		this._route.paramMap.subscribe((params) => {
			this.pet_id = params.get('pet_id') || '';
		});
	}

	ngOnInit(): void {
		this._petrecordService
			.get({ query: this._query() })
			.subscribe((records) => {
				this.records = records;
			});
	}

	private _query(): string {
		let query = '';

		if (this.pet_id) {
			query += (query ? '&' : '') + 'pet=' + this.pet_id;
		}

		return query;
	}

	
}
