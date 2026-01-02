import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BASE_PATH } from './api-client/variables';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    { provide: BASE_PATH, useValue: 'http://localhost:8080' },
    importProvidersFrom(HttpClientModule)
  ]
};
