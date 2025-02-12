import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PetlinkService } from '../../services/petlink.service';
import { Petlink } from '../../interfaces/petlink.interface';

@Component({
	selector: 'petlink-selector',
	templateUrl: './petlink-selector.component.html',
	styleUrls: ['./petlink-selector.component.scss'],
	imports: [SelectModule],
})
export class PetlinkSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Petlink[] {
		return this._petlinkService.petlinks;
	}

	constructor(private _petlinkService: PetlinkService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
