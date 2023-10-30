import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightsRoutingModule } from './flights-routing.module';
import { FlightsComponent } from './flights.component';
import { SearchComponent } from '../../components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from '../../components/flight/create/create.component';


@NgModule({
  declarations: [
    FlightsComponent,
    SearchComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    FlightsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FlightsModule { }
