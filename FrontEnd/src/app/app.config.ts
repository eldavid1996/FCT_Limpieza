import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Importa el arreglo de rutas desde su ubicación
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { SeguridadInterceptor } from './components/seguridad/seguridad-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(), provideAnimationsAsync(),{provide:HTTP_INTERCEPTORS, useClass:SeguridadInterceptor, multi:true}]
};
