import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DrugsComponent } from './drugs.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: DrugsComponent
	},
	{
		path: ':place_id',
		component: DrugsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [DrugsComponent],
	providers: []
})
export class DrugsModule {}
