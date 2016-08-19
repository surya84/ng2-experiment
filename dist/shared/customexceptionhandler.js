"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var injector_1 = require('./injector');
var CustomExceptionHandler = (function (_super) {
    __extends(CustomExceptionHandler, _super);
    function CustomExceptionHandler() {
        _super.call(this, null, null);
    }
    CustomExceptionHandler.prototype.call = function (exception, stackTrace, reason) {
        console.log(exception);
        console.error("Error!", exception.message, "error");
        if (exception.message.indexOf("Config was not loaded") > -1) {
            var injector = injector_1.AppInjector();
            this._router = injector.get(router_1.Router);
            this._router.navigate(["/login"]);
        }
        //switch (typeof exception) {
        //    case typeof (ReferenceError): {
        //        break;
        //    }
        //}
    };
    CustomExceptionHandler = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CustomExceptionHandler);
    return CustomExceptionHandler;
}(core_1.ExceptionHandler));
exports.CustomExceptionHandler = CustomExceptionHandler;
//# sourceMappingURL=customexceptionhandler.js.map