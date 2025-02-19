import { Component, Input } from '@angular/core';
import { Petallergy } from 'src/app/modules/petallergy/interfaces/petallergy.interface';
import { PetallergyService } from 'src/app/modules/petallergy/services/petallergy.service';

@Component({
	selector: 'app-allergies',
	standalone: false,
	templateUrl: './allergies.component.html',
	styleUrl: './allergies.component.scss'
})
export class AllergiesComponent {
	@Input() petallergy: string;
	allergy: Petallergy;

	constructor(private _petallergyService: PetallergyService) {}

	ngOnInit() {
		this.allergy = this._petallergyService.doc(this.petallergy);
	}
}
