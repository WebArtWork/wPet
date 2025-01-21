import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../interfaces/pet.interface';

@Component({
	selector: 'pet-selector',
	templateUrl: './pet-selector.component.html',
	styleUrls: ['./pet-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Pet[] {
		return this._petService.pets;
	}

	constructor(private _petService: PetService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
