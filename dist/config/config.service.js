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
var Observable_1 = require('rxjs/Observable');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var ConfigService = (function () {
    function ConfigService(http) {
        this.http = http;
    }
    Object.defineProperty(ConfigService.prototype, "lookupConfig", {
        get: function () {
            return this._lookupData;
        },
        enumerable: true,
        configurable: true
    });
    ConfigService.prototype.isReady = function () {
        return this._loaded;
    };
    ConfigService.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._loaded) {
                resolve(true);
                return true;
            }
            _this.http.get('app/config/env.json')
                .map(function (res) { return res.json(); })
                .subscribe(function (env_data) {
                _this._env = env_data;
                console.log(env_data);
                _this.http.get('app/config/' + env_data.env + '.json')
                    .map(function (res) { return res.json(); })
                    .catch(function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                })
                    .subscribe(function (data) {
                    _this._config = data;
                    sessionStorage["AsscoiatePortal_Configuration"] = JSON.stringify(data);
                    _this._loaded = true;
                    console.log(data);
                    resolve(true);
                });
            });
        });
    };
    ConfigService.prototype.loadLookupConfig = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._lookupData) {
                resolve(true);
                return true;
            }
            _this.http.get('app/config/lookup.json')
                .map(function (res) { return res.json(); })
                .subscribe(function (lookupData) {
                _this._lookupData = lookupData;
                resolve(true);
                console.log(lookupData);
            });
        });
    };
    ConfigService.prototype.getEnv = function (key) {
        return this._env[key];
    };
    ConfigService.prototype.get = function (key) {
        if (!this._config) {
            throw new Error("Config was not loaded");
        }
        return this._config[key];
    };
    ConfigService.prototype.setCustom = function (key, val) {
        this._configCustom[key] = val;
    };
    ConfigService.prototype.getCustom = function (key) {
        return this._configCustom[key];
    };
    ConfigService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
;
//# sourceMappingURL=config.service.js.map