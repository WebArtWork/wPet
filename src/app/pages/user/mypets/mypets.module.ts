import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MypetsComponent } from './mypets.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: MypetsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MypetsComponent]
})
export class MypetsModule {}
