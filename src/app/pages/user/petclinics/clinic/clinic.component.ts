import { Component, Input } from '@angular/core';
import { Petclinic } from 'src/app/modules/petclinic/interfaces/petclinic.interface';

@Component({
	selector: 'app-clinic',
	standalone: false,

	templateUrl: './clinic.component.html',
	styleUrl: './clinic.component.scss'
})
export class ClinicComponent {
	@Input() clinics: Petclinic;
}
