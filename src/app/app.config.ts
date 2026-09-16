//import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
//import { provideRouter } from '@angular/router';

//import { routes } from './app.routes';
//import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

//export const appConfig: ApplicationConfig = {
 // providers: [
   // provideBrowserGlobalErrorListeners(),
     
  //  provideRouter(routes), provideClientHydration(withEventReplay())
 // ]
//};

import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  importProvidersFrom
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // ✅ Your existing providers
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // ✅ Fix NG02801 (HttpClient + fetch)
    provideHttpClient(withFetch()),

    // ✅ Required for ngx-toastr
    provideAnimations(),

    // ✅ Fix NG0201 (ToastConfig not found)
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true
      })
    )
  ]
};
 