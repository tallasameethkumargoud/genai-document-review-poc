import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';        // ✅ ADD
import { routes } from './app/app.routes';              // ✅ ADD

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)                              // ✅ now valid
  ]
}).catch(err => console.error(err));