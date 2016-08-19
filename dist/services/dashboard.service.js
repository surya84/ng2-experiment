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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var Observable_1 = require('rxjs/Observable');
var DashboardService = (function () {
    function DashboardService(_http) {
        this._http = _http;
        var configData = JSON.parse(sessionStorage["AsscoiatePortal_Configuration"]);
        if (!configData) {
            throw new ReferenceError("Config was not loaded!");
        }
        var loginData = JSON.parse(sessionStorage["AsscoiatePortal_UserInformation"]);
        this._roleName = loginData.roleName;
        this._serverURL = configData.ServerUrl;
    }
    DashboardService.prototype.getDashboardNotificationCount = function () {
        var _url = this._serverURL;
        switch (this._roleName) {
            case 'HRM': {
                _url += "/SystemNotification/GetNotificationCount?notificationTypeId=2";
                break;
            }
            case 'ITHead': {
                _url += "/SystemNotification/CountNotifications";
                break;
            }
            case 'FinanceHead': {
                _url += "/SystemNotification/CountFinanceNotifications";
                break;
            }
            case 'AdminHead': {
                _url += "/SystemNotification/CountAdminNotifications";
                break;
            }
            case 'HRA': {
                _url += "/SystemNotification/GetHRANotificationCount?notificationTypeId=2";
                break;
            }
            case 'SystemAdmin': {
                _url += "/SystemNotification/GetHRANotificationCount?notificationTypeId=2";
                break;
            }
            default: {
            }
        }
        return this._http.get(_url).map(function (x) { return x.json(); });
    };
    DashboardService.prototype.getHRHeadDetails = function () {
        var _this = this;
        var _url = this._serverURL + "/Dashboard/GetHRHeadDetails";
        return new Promise(function (resolve, reject) {
            _this._http.get(_url)
                .map(function (res) { return res.json(); })
                .catch(function (error) {
                console.error(error);
                reject(error);
                return Observable_1.Observable.throw(error.json().error || 'Server error');
            })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    DashboardService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DashboardService);
    return DashboardService;
}());
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map