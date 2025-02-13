import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PetdrugService } from '../../services/petdrug.service';
import { Petdrug } from '../../interfaces/petdrug.interface';

@Component({
	selector: 'petdrug-selector',
	templateUrl: './petdrug-selector.component.html',
	styleUrls: ['./petdrug-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectPetdrugComponent implements OnChanges {
	@Input() value: string;
	@Input() disabled: boolean;

	@Output() wChange = new EventEmitter();

	get items(): Petdrug[] {
		return this._petdrugService.petdrugs;
	}

	constructor(private _petdrugService: PetdrugService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
		if (changes['disabled'] && !changes['disabled'].firstChange) {
			this.disabled = changes['disabled'].currentValue;
		}
	}
}
