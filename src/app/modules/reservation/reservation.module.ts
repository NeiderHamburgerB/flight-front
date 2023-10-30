import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { TableComponent } from '../../components/reservation/table/table.component';
import { ReservationRoutingModule } from './reservation-routing.module';

@NgModule({
  declarations: [
    TableComponent,
    ReservationComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule
  ]
})
export class ReservationModule { }
