import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { Appointment } from '../models/Appointment';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public appointments: Appointment[];

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointments()
      .subscribe((appointments: Appointment[]) =>{
        this.appointments = appointments
        this.loading = false;
        // console.log('appointments ',this.appointments)
        // console.log(this.loading)
      }, 
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message
        this.loading = false
      })

    // this.appointments = [
    //   {
    //     _id: '1',
    //     appointmentDate: '2020.03.05',
    //     name: 'Lekky Jay',
    //     email: 'Leslie@email.com'
    //   },
    //   {
    //     _id: '2',
    //     appointmentDate: '2020.04.05',
    //     name: 'Lekky Jay',
    //     email: 'purple@email.com'
    //   },
    //   {
    //     _id: '3',
    //     appointmentDate: '2020.05.05',
    //     name: 'Lekky Jay',
    //     email: 'biola@email.com'
    //   },
    //   {
    //     _id: '4',
    //     appointmentDate: '2020.05.05',
    //     name: 'Lekky Jay',
    //     email: 'biola@email.com'
    //   },
    //   {
    //     _id: '5',
    //     appointmentDate: '2020.05.05',
    //     name: 'Lekky Jay',
    //     email: 'biola@email.com'
    //   },
    //   {
    //     _id: '6',
    //     appointmentDate: '2020.05.05',
    //     name: 'Lekky Jay',
    //     email: 'biola@email.com'
    //   },
    //   {
    //     _id: '7',
    //     appointmentDate: '2020.05.05',
    //     name: 'Lekky Jay',
    //     email: 'biola@email.com'
    //   }
    // ]
  }

  cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id)
      .pipe(
        mergeMap(() => this.appointmentService.getAppointments())
      )
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments
        this.successMsg = 'Appointment cancelled!'
        this.appointmentService.onSuccess(this.successMsg)
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message
      })
  }

}
