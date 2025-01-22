import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PethistoryComponent } from './pethistory.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PethistoryComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PethistoryComponent]
})
export class PethistoryModule {}
