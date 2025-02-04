import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PetrecordService } from 'src/app/modules/petrecord/services/petrecord.service';

@Component({
	templateUrl: './pethistorypage.component.html',
	styleUrls: ['./pethistorypage.component.scss'],
	standalone: false
})
export class PethistorypageComponent {
	petrecord = this._petrecordService.doc(
		this._router.url.replace('/pethistorypage/', '')

	);

	constructor(
		private _petrecordService: PetrecordService,
		private _router: Router
	) { }

	isMenuOpen = false
}
