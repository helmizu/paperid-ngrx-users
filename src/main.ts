import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app/app.routes";

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            BrowserModule,
            EffectsModule.forRoot([]),
            StoreModule.forRoot({}, {}),
            StoreDevtoolsModule.instrument({
                maxAge: 25,
                logOnly: !isDevMode(),
                autoPause: true,
                trace: false,
                traceLimit: 75,
                connectInZone: true
            })),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideRouter(appRoutes), provideAnimationsAsync()
    ]
})
    .catch(err => console.error(err));
