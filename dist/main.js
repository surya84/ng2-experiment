"use strict";
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var config_service_1 = require('./config/config.service');
var injector_1 = require('./shared/injector');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var dashboard_service_1 = require('./services/dashboard.service');
var authetication_service_1 = require('./services/authetication.service');
var app_routes_1 = require('./routes/app.routes');
var httpinterceptor_1 = require('./shared/httpinterceptor');
var customexceptionhandler_1 = require('./shared/customexceptionhandler');
var forms_1 = require('@angular/forms');
var lookup_component_1 = require('./shared/Lookup/lookup.component');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    lookup_component_1.LookupComponent,
    dashboard_service_1.DashboardService,
    authetication_service_1.AuthenticationService,
    config_service_1.ConfigService,
    router_1.ROUTER_DIRECTIVES,
    common_1.FORM_PROVIDERS,
    http_1.HTTP_PROVIDERS,
    app_routes_1.APP_ROUTER_PROVIDERS,
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    core_1.provide(core_1.ExceptionHandler, { useClass: customexceptionhandler_1.CustomExceptionHandler }),
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
    core_1.provide(http_1.Http, {
        useFactory: function (xhrBackend, requestOptions, router) { return new httpinterceptor_1.HttpInterceptor(xhrBackend, requestOptions, router); },
        deps: [http_1.XHRBackend, http_1.RequestOptions, router_1.Router]
    })
]).then(function (appRef) {
    injector_1.AppInjector(appRef.injector);
}, function (error) { return console.log(error); });
//# sourceMappingURL=main.js.map