import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      BrowserModule,
      FontAwesomeModule
    ]),
    provideHttpClient(withInterceptorsFromDi())
  ],
})
  .catch(err => console.error(err));
