import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { SeguridadInterceptor } from './components/seguridad/seguridad-interceptor';
import { UserService } from './services/user.service';
import { RoomService } from './services/room.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: SeguridadInterceptor, multi: true },
    UserService,
    RoomService
  ],
};
