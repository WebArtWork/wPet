import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PetitemService } from '../../services/petitem.service';
import { Petitem } from '../../interfaces/petitem.interface';

@Component({
	selector: 'petitem-selector',
	templateUrl: './petitem-selector.component.html',
	styleUrls: ['./petitem-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectPetitemComponent implements OnChanges {
	@Input() value: string;
	@Input() disabled: boolean;

	@Output() wChange = new EventEmitter();

	get items(): Petitem[] {
		return this._petitemService.petitems;
	}

	constructor(private _petitemService: PetitemService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
		if (changes['disabled'] && !changes['disabled'].firstChange) {
			this.disabled = changes['disabled'].currentValue;
		}
	}
}
