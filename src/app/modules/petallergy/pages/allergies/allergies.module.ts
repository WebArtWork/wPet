import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { AllergiesComponent } from './allergies.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: AllergiesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [AllergiesComponent],
	providers: []
})
export class AllergiesModule {}
