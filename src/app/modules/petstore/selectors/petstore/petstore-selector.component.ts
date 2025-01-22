import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PetstoreService } from '../../services/petstore.service';
import { Petstore } from '../../interfaces/petstore.interface';

@Component({
	selector: 'petstore-selector',
	templateUrl: './petstore-selector.component.html',
	styleUrls: ['./petstore-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Petstore[] {
		return this._petstoreService.petstores;
	}

	constructor(private _petstoreService: PetstoreService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
