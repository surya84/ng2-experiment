"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var authetication_service_1 = require('../services/authetication.service');
var index_1 = require('../models/index');
var config_service_1 = require('../config/config.service');
require('rxjs/Rx');
var LoginComponent = (function () {
    function LoginComponent(_router, _service, _configService) {
        this._router = _router;
        this._service = _service;
        this._configService = _configService;
        this.loading = false;
        this._login = new index_1.User();
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        event.preventDefault();
        this.loading = true;
        this.errorMessage = "";
        this._service.login(this._login).then(function () {
            _this.loading = false;
            _this._router.navigate(['/ap/dashboard']);
        }).catch(function (res) {
            _this.loading = false;
            _this.errorMessage = "We don't recognize this user ID or password"; //move this to resurces
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
        this._configService.load().then(function () { return console.log("Config was loaded"); });
        this._configService.loadLookupConfig().then(function () { return console.log("Config was loaded"); });
    };
    LoginComponent = __decorate([
        core_1.Component({
            // moduleId: module.id,
            selector: 'login-form',
            directives: [router_1.ROUTER_DIRECTIVES, common_1.NgIf],
            templateUrl: "app/login/login.component.html",
        }),
        __param(0, core_1.Inject(router_1.Router)),
        __param(1, core_1.Inject(authetication_service_1.AuthenticationService)),
        __param(2, core_1.Inject(config_service_1.ConfigService)), 
        __metadata('design:paramtypes', [router_1.Router, authetication_service_1.AuthenticationService, config_service_1.ConfigService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map