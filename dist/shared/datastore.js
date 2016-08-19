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
var injector_1 = require('./injector');
require('rxjs/add/operator/map');
var Observable_1 = require('rxjs/Observable');
var util_1 = require('../utility/util');
var DataStore = (function () {
    function DataStore(_url) {
        this._url = _url;
        if (this._url == null) {
            throw new Error("No endpoints were provided!");
        }
        var injector = injector_1.AppInjector();
        this._http = injector.get(http_1.Http);
        // this._config = injector.get(ConfigService);
        // if (!this._config.isReady()) {
        //     throw new Error("Config was not loaded!");
        // }
        var _config = JSON.parse(sessionStorage["AsscoiatePortal_Configuration"]);
        this._serverURL = _config.ServerUrl;
    }
    //region Not Implemented
    DataStore.prototype.getById = function (id) {
        if (!this._url.getById) {
            throw new Error("getById resource not provided!");
        }
        var url = this._serverURL + this._url.getById;
        return this._http.get(url)
            .map(function (res) { return util_1.Util.extractData(res); })
            .catch(function (err) { return util_1.Util.handleError(err); });
    };
    DataStore.prototype.getByCode = function (code) {
        if (!this._url.getByCode) {
            throw new Error("getById resource not provided!");
        }
        var url = this._serverURL + this._url.getByCode;
        return this._http.get(url)
            .map(function (res) { return util_1.Util.extractData(res); })
            .catch(function (err) { return util_1.Util.handleError(err); });
    };
    DataStore.prototype.update = function (obj) {
        if (!this._url.update) {
            //throw new Error("update resource not provided!");
            swal("update resource not provided!", "", "error");
            return Observable_1.Observable.throw("update resource not provided!");
        }
        var url = this._serverURL + this._url.update;
        return this._http.post(url, obj)
            .map(function (res) { return util_1.Util.extractData(res); })
            .catch(function (err) { return util_1.Util.handleError(err); });
    };
    DataStore.prototype.delete = function (id) {
        if (!this._url.delete) {
            throw new Error("delete resource not provided!");
        }
        var url = this._serverURL + this._url.delete;
        return this._http.get(url)
            .map(function (res) { return util_1.Util.extractData(res); })
            .catch(function (err) { return util_1.Util.handleError(err); });
    };
    DataStore.prototype.create = function (obj) {
        if (!this._url.create) {
            swal("create resource not provided!", "", "error");
            return Observable_1.Observable.throw("create resource not provided!");
        }
        var url = this._serverURL + this._url.create;
        return this._http.post(url, obj)
            .map(function (res) { return util_1.Util.extractData(res); })
            .catch(function (err) { return util_1.Util.handleError(err); });
    };
    //endregion
    DataStore.prototype.list = function () {
        if (!this._url.list) {
            throw new Error("list resource not provided!");
        }
        var url = this._serverURL + this._url.list;
        return this._http.get(url)
            .map(function (res) { return util_1.Util.extractData(res); })
            .catch(function (err) { return util_1.Util.handleError(err); });
    };
    DataStore = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Object])
    ], DataStore);
    return DataStore;
}());
exports.DataStore = DataStore;
//# sourceMappingURL=datastore.js.map