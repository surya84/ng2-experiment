/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />
import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide, ComponentRef, ExceptionHandler, Injector } from '@angular/core';
import { FORM_PROVIDERS, LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { HTTP_PROVIDERS, Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from './app.component';

import { ConfigService } from './config/config.service';
import { AppInjector } from './shared/injector';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { DashboardService } from './services/dashboard.service';
import { AuthenticationService } from './services/authetication.service';

import { APP_ROUTER_PROVIDERS } from './routes/app.routes';
import { HttpInterceptor } from './shared/httpinterceptor';
import { CustomExceptionHandler } from './shared/customexceptionhandler';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { LookupComponent } from './shared/Lookup/lookup.component';

bootstrap(AppComponent, [
    LookupComponent,
    DashboardService,
    AuthenticationService,
    ConfigService,
    ROUTER_DIRECTIVES,
    FORM_PROVIDERS,
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    provide(ExceptionHandler, { useClass: CustomExceptionHandler }),
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide(Http, {
        useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) => new HttpInterceptor(xhrBackend, requestOptions, router),
        deps: [XHRBackend, RequestOptions, Router]
    })
]).then((appRef: ComponentRef<any>) => {
    AppInjector(appRef.injector);
}, error => console.log(error));
