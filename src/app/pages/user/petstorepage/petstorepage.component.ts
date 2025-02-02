import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PetstoreService } from 'src/app/modules/petstore/services/petstore.service';

@Component({
	templateUrl: './petstorepage.component.html',
	styleUrls: ['./petstorepage.component.scss'],
	standalone: false
})
export class PetstorepageComponent {
	petstore = this._petstoreService.doc(
		this._router.url.replace('/petstorepage/', '')
	);

	constructor(
		private _petstoreService: PetstoreService,
		private _router: Router
	) {}
}
