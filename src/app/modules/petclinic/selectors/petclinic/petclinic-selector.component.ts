import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PetclinicService } from '../../services/petclinic.service';
import { Petclinic } from '../../interfaces/petclinic.interface';

@Component({
	selector: 'petclinic-selector',
	templateUrl: './petclinic-selector.component.html',
	styleUrls: ['./petclinic-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Petclinic[] {
		return this._petclinicService.petclinics;
	}

	constructor(private _petclinicService: PetclinicService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
