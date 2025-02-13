import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PetfoodService } from '../../services/petfood.service';
import { Petfood } from '../../interfaces/petfood.interface';

@Component({
	selector: 'petfood-selector',
	templateUrl: './petfood-selector.component.html',
	styleUrls: ['./petfood-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectPetfoodComponent implements OnChanges {
	@Input() value: string;
	@Input() disabled: boolean;

	@Output() wChange = new EventEmitter();

	get items(): Petfood[] {
		return this._petfoodService.petfoods;
	}

	constructor(private _petfoodService: PetfoodService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
		if (changes['disabled'] && !changes['disabled'].firstChange) {
			this.disabled = changes['disabled'].currentValue;
		}
	}
}
