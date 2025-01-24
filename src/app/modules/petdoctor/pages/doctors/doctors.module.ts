import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DoctorsComponent } from './doctors.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: DoctorsComponent
	},
	{
		path: ':clinic_id',
		component: DoctorsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [DoctorsComponent],
	providers: []
})
export class DoctorsModule {}
