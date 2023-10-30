import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {

  private backendUrl = environment.backendUrl;
  flights: any[] = [];
  loading: boolean = false;
  messageSuccess: string = ''; 
  messageError: string = ''; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFlights();
  }
  
  loadFlights() {
    this.loading = true;
    this.http.get<any>(`${this.backendUrl}/flight`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener los vuelos:', error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe(response => {
        if (response && Array.isArray(response.data)) {
          this.flights = response.data;
        }
      })
      .add(() => this.loading = false);
  }

  filterFlights(searchParams: { searchTerm: string }) {
    const { searchTerm } = searchParams;
    
    this.http.get<any>(`${this.backendUrl}/flight?search=${searchTerm}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener los vuelos:', error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe(response => {
        if (response && Array.isArray(response.data)) {
          this.flights = response.data;
        }
      })
    .add(() => this.loading = false);
  }
  
}
