import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { StoreComponent } from './store.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: StoreComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [StoreComponent],
	providers: []
})
export class StoreModule {}
