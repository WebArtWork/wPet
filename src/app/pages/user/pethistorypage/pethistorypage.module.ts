import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PethistorypageComponent } from './pethistorypage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':record_id',
		component: PethistorypageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PethistorypageComponent]
})
export class PethistorypageModule {}
