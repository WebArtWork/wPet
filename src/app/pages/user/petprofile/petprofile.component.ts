import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PetService } from 'src/app/modules/pet/services/pet.service';

@Component({
	templateUrl: './petprofile.component.html',
	styleUrls: ['./petprofile.component.scss'],
	standalone: false
})
export class PetprofileComponent {
	petprofile = this._petService.doc(
		this._router.url.replace('/petprofile/', '')
	);

	constructor(private _petService: PetService, private _router: Router) {}
}
