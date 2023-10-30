import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'flights', loadChildren: () => import('./modules/flight/flights.module').then(m => m.FlightsModule) },
  { path: 'reservation', loadChildren: () => import('./modules/reservation/reservation.module').then(m => m.ReservationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
