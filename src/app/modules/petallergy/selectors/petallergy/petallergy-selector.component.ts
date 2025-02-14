import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PetallergyService } from '../../services/petallergy.service';
import { Petallergy } from '../../interfaces/petallergy.interface';

@Component({
	selector: 'petallergy-selector',
	templateUrl: './petallergy-selector.component.html',
	styleUrls: ['./petallergy-selector.component.scss'],
	imports: [SelectModule]
})
export class PetallergySelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Petallergy[] {
		return this._petallergyService.petallergys;
	}

	constructor(private _petallergyService: PetallergyService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
