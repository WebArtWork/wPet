import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PetdoctorService } from '../../services/petdoctor.service';
import { Petdoctor } from '../../interfaces/petdoctor.interface';

@Component({
	selector: 'petdoctor-selector',
	templateUrl: './petdoctor-selector.component.html',
	styleUrls: ['./petdoctor-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Petdoctor[] {
		return this._petdoctorService.petdoctors;
	}

	constructor(private _petdoctorService: PetdoctorService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
