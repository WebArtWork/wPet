import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PethistoryComponent } from './pethistory.component';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
	{
		path: ':pet_id',
		component: PethistoryComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PethistoryComponent, HistoryComponent]
})
export class PethistoryModule {}
