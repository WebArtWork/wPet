import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PetrecordService } from '../../services/petrecord.service';
import { Petrecord } from '../../interfaces/petrecord.interface';

@Component({
	selector: 'petrecord-selector',
	templateUrl: './petrecord-selector.component.html',
	styleUrls: ['./petrecord-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Petrecord[] {
		return this._petrecordService.petrecords;
	}

	constructor(private _petrecordService: PetrecordService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
