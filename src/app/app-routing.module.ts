import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { DashboardComponent }   from './dashboard/dashboard.component';
import { NavbarComponent }   from './navbar/navbar.component';
import { ErrorComponent }   from './error/error.component';
import { LoginComponent }   from './login/login.component';
import { EventComponent }   from './event/event.component';
import { AlertComponent }   from './alert/alert.component';
import { ProfileComponent }   from './profile/profile.component';
import { MapComponent }   from './map/map.component';
import { NodeDetailsComponent } from './node-details/node-details.component';

//Guerdian
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'events', component: EventComponent},
  { path: 'alerts', component: AlertComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'map', component: MapComponent},
  { path: 'dashboard/node-detail/:name', component: NodeDetailsComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
  //{ path: 'detail/:id', component: NavbarComponent }, esto lo dejo como muestra de q puedo pasar un parametro. por la url
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
