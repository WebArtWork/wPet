import { Component, Input } from '@angular/core';
import { Petrecord } from 'src/app/modules/petrecord/interfaces/petrecord.interface';

@Component({
  selector: 'app-history',
  standalone: false,
  
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
    @Input() record: Petrecord;  
}
