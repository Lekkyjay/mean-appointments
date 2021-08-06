import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './models/Appointment';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient, private notifyService: NotificationsService) { }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.BASE_URL}/appointments`);
  }

  createAppointment(appointmentDate: string, name: string, email: string): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.BASE_URL}/appointments`, {appointmentDate, name, email});
  }

  cancelAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/appointments/${id}`);
  }

  onSuccess(msg) {
    this.notifyService.success('Success', msg)
  }

  onError(msg) {
    this.notifyService.error('Error', msg)
  }

}
