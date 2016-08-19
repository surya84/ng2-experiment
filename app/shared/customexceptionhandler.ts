import { Injectable, ExceptionHandler } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { AppInjector } from './injector';

@Injectable()
export class CustomExceptionHandler extends ExceptionHandler {
    private _router: Router;
    constructor() {
        super(null, null);
    }

    call(exception: any, stackTrace?: any, reason?: string): void {
        console.log(exception);
        console.error("Error!", exception.message, "error");
        if (exception.message.indexOf("Config was not loaded") > -1) {
            var injector = AppInjector();
            this._router = injector.get(Router);

            this._router.navigate(["/login"]);
        }

        //switch (typeof exception) {
        //    case typeof (ReferenceError): {

        //        break;
        //    }
        //}
    }
}