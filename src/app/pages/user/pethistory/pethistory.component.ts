import { Component } from '@angular/core';
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
	constructor(private _petrecordService: PetrecordService) { }

	ngOnInit(): void {
		this._petrecordService
			.get({}, { name: 'public' })
			.subscribe((records) => {
				this.records = records;
			});
	}
}
