import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

//Para bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

//Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { EventComponent } from './event/event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { NodeDetailsComponent } from './node-details/node-details.component';
import { MemoryComponent } from './memory/memory.component';
import { HardDiskComponent } from './hard-disk/hard-disk.component';
import { LogRealTimeComponent } from './log-real-time/log-real-time.component';
import { AgentComponent } from './agent/agent.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module

//Servicios
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './_interceptors/auth-interceptor';
import { ListNodes } from './_services/listNodes.service';
import { MemoryService } from './_services/memory.service'
import { HardDiskService } from './_services/hardDisc.service';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { AgentService } from './_services/agent.service';
import { NotificationComponent } from './notification/notification.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    AlertComponent,
    EventComponent,
    DashboardComponent,
    MapComponent,
    NavbarComponent,
    ProfileComponent,
    NodeDetailsComponent,
    MemoryComponent,
    HardDiskComponent,
    LogRealTimeComponent,
    AgentComponent,
    EventDetailComponent,
    NotificationComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    Ng2SearchPipeModule //including into imports
  ],
  providers: [
    ListNodes,
    MemoryService,
    HardDiskService,
    CookieService,
    AgentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
