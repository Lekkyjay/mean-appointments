import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { Appointment } from '../models/Appointment';

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
        this.appointments = appointments;
        this.loading = false;
        console.log(this.appointments);
        console.log(this.loading);
      }, 
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      });
      
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
    //   }
    // ]
  }

}
