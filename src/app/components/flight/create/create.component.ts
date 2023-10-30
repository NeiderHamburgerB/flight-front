import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  private backendUrl = environment.backendUrl;
  mode: 'create' | 'edit' | 'view' = 'view';
  createForm: FormGroup;
  id: string = '';
  loading: boolean = false;
  flight: any;
  messageSuccess: string = ''; 
  messageError: string = ''; 

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.createForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      flight_id: ['',this.id]
    });
  }

  ngOnInit(): void {
    this.mode = this.route.snapshot.data['mode'];
    this.id = this.route.snapshot.params['id'];
    this.getFlight(this.id);
  }

  getFlight(id: string) {
    this.loading = true;
    this.http.get<any>(`${this.backendUrl}/flight/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener el vuelo:', error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe(res => {
        this.flight = res;
        this.createForm.get('flight_id')?.setValue(this.flight.id);
      })
      .add(() => this.loading = false);
  }

  onSubmit() {
    if (this.createForm.valid) {
      const reservationData = this.createForm.value;
      const body = {
        
      }
      this.http.post<any>(`${this.backendUrl}/reservation`, reservationData)
        .pipe(
          catchError(error => {
            console.error('Error al crear la reserva:', error);
            this.messageSuccess = ''
            this.messageError = 'Ocurrió un error al intentar crear la reserva';
            return throwError(() => new Error(error));
          })
        )
          .subscribe(response => {
            this.messageError = '';
            this.messageSuccess = 'Reserva creada :)';
            this.createForm.reset();
            this.router.navigate(['/reservation']);
          });
      }
  }

}
