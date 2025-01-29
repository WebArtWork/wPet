import { Component } from '@angular/core';
import { Petclinic } from 'src/app/modules/petclinic/interfaces/petclinic.interface';
import { PetclinicService } from 'src/app/modules/petclinic/services/petclinic.service';

@Component({
	templateUrl: './petclinics.component.html',
	styleUrls: ['./petclinics.component.scss'],
	standalone: false
})
export class PetclinicsComponent {
	clinics: Petclinic[] = [];

	constructor(private _petclinicService: PetclinicService) {}

	ngOnInit(): void {
		this._petclinicService
			.get({}, { name: 'public' })
			.subscribe((clinics) => {
				this.clinics = clinics;
			});
	}
}
