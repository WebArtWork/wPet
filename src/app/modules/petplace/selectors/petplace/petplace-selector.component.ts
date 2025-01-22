import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PetplaceService } from '../../services/petplace.service';
import { Petplace } from '../../interfaces/petplace.interface';

@Component({
	selector: 'petplace-selector',
	templateUrl: './petplace-selector.component.html',
	styleUrls: ['./petplace-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Petplace[] {
		return this._petplaceService.petplaces;
	}

	constructor(private _petplaceService: PetplaceService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
