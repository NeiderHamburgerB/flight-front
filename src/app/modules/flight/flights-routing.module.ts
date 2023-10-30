import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from './flights.component';
import { CreateComponent } from '../../components/flight/create/create.component';

const routes: Routes = [
  { path: '', component: FlightsComponent },
  { path: 'reservation/:id', component: CreateComponent, data: { mode: 'create' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightsRoutingModule { }
