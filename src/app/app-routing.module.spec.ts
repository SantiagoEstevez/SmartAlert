import { AppRoutingModule } from './app-routing.module';

//Componentes
import { DashboardComponent }   from './dashboard/dashboard.component';
import { NavbarComponent }   from './navbar/navbar.component';
import { ErrorComponent }   from './error/error.component';
import { LoginComponent }   from './login/login.component';
import { EventComponent }   from './event/event.component';
import { AlertComponent }   from './alert/alert.component';
import { ProfileComponent }   from './profile/profile.component';
import { MapComponent }   from './map/map.component';

describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;

  beforeEach(() => {
    appRoutingModule = new AppRoutingModule();
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});
