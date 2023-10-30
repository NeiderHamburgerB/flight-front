import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  private backendUrl = environment.backendUrl;
  id: string = '';
  loading: boolean = false;
  reservations: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.loading = true;
    this.http.get<any>(`${this.backendUrl}/reservation`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener las reservas:', error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe(response => {
        if (response && Array.isArray(response.data)) {
          this.reservations = response.data;

          console.log('data', this.reservations)
        }
      })
      .add(() => this.loading = false);
  }
}
