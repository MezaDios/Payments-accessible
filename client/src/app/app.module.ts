import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { CrudService } from './services/crud.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddChargeComponent } from './components/add-charge/add-charge.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { GeneralStatsComponent } from './components/general-stats/general-stats.component';
import { ConsultsComponent } from './components/consults/consults.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PageNotFoundComponent,
    AdminViewComponent,
    UserViewComponent,
    AddUserComponent,
    AddChargeComponent,
    AddPaymentComponent,
    GeneralStatsComponent,
    ConsultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CrudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
