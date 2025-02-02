import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetstorepageComponent } from './petstorepage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':store_id',
		component: PetstorepageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PetstorepageComponent]
})
export class PetstorepageModule {}
