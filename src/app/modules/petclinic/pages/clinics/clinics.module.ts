import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ClinicsComponent } from './clinics.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ClinicsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ClinicsComponent],
	providers: []
})
export class ClinicsModule {}
