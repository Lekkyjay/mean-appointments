import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    AppointmentListComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SimpleNotificationsModule.forRoot({ position: ["top", "right"] })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
