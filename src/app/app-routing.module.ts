import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { DashboardComponent }   from './dashboard/dashboard.component';
import { NavbarComponent }   from './navbar/navbar.component';
import { ErrorComponent }   from './error/error.component';
import { LoginComponent }   from './login/login.component';
import { EventComponent }   from './event/event.component';
import { EventDetailComponent }   from './event-detail/event-detail.component';
import { AlertComponent }   from './alert/alert.component';
import { ProfileComponent }   from './profile/profile.component';
import { MapComponent }   from './map/map.component';
import { NodeDetailsComponent } from './node-details/node-details.component';
import { AgentComponent } from './agent/agent.component';
import { LogRealTimeComponent } from './log-real-time/log-real-time.component';
import { NotificationComponent } from './notification/notification.component';
import { UserComponent } from './user/user.component';

//Guerdian
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'events', component: EventComponent, canActivate: [AuthGuard]},
  { path: 'events/detail', component: EventDetailComponent, canActivate: [AuthGuard]},
  { path: 'alerts', component: AlertComponent, canActivate: [AuthGuard]},
  { path: 'notifications', component: NotificationComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'map', component: MapComponent, canActivate: [AuthGuard]},
  { path: 'dashboard/node-detail/:name/:distro/:address/:public/:cpu/:ram', component: NodeDetailsComponent, canActivate: [AuthGuard]},
  { path: 'socket', component: LogRealTimeComponent, canActivate: [AuthGuard]},
  { path: 'agent', component: AgentComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
  //{ path: 'detail/:id', component: NavbarComponent }, esto lo dejo como muestra de q puedo pasar un parametro. por la url
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
