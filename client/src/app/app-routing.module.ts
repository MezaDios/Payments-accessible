import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddChargeComponent } from './components/add-charge/add-charge.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { GeneralStatsComponent } from './components/general-stats/general-stats.component';
import { ConsultsComponent } from './components/consults/consults.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'show',
    component: NavbarComponent
  },
  {
    path: 'admin',
    component: AdminViewComponent
  },
  {
    path: 'user',
    component: UserViewComponent
  },
  {
    path: 'add/payment',
    component: AddPaymentComponent
  },
  {
    path: 'add/charge',
    component: AddChargeComponent
  },
  {
    path: 'add/user',
    component: AddUserComponent
  },
  {
    path: 'show/general',
    component: GeneralStatsComponent
  },
  {
    path: 'show/consults',
    component: ConsultsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
