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
var config_service_1 = require('../config/config.service');
// import * as CryptoJS from 'crypto-js';
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var AuthenticationService = (function () {
    function AuthenticationService(_config, _http) {
        this._config = _config;
        this._http = _http;
        this.loggedIn = false;
        this.emptyLoginData();
    }
    AuthenticationService.prototype.login = function (loginData) {
        var _this = this;
        this.loggedIn = true;
        this.loginData = loginData;
        //const key = this._config.get("Crypto-Key"); // CryptoJS.enc.Utf8.parse('8080808080808080');
        //const iv = this._config.get("Crypto-iv"); //CryptoJS.enc.Utf8.parse('8080808080808080');
        //let encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(loginData.password.toString()), key,
        //    {
        //        keySize: 128 / 8,
        //        iv: iv,
        //        mode: CryptoJS.mode.CBC,
        //        padding: CryptoJS.pad.Pkcs7
        //    });
        var data = "grant_type=password&username=" + this.loginData.email + "&password=" + this.loginData.password;
        var url = this._config.get("ServerUrl") + "/UserLogin";
        return new Promise(function (resolve, reject) {
            _this._http.post(url, data)
                .map(function (res) { return res.json(); })
                .subscribe(function (lData) {
                // console.log(lData);
                sessionStorage["token"] = lData.access_token;
                _this.loginData.roleName = lData.role;
                if (lData.userName.indexOf("@") > 0) {
                    var uname = lData.userName.split("@");
                    if (uname.length > 1 && uname[0].indexOf(".") > 0) {
                        _this.loginData.firstName = uname[0].split(".")[0];
                        _this.loginData.lastName = uname[0].split(".")[1];
                        _this.loginData.fullName = _this.loginData.firstName + ' ' + _this.loginData.lastName;
                    }
                }
                sessionStorage["AsscoiatePortal_UserInformation"] = JSON.stringify(_this.loginData);
                resolve(lData);
            }, function (error) { return reject(error); });
        });
    };
    AuthenticationService.prototype.loginFromSession = function () {
        // load from session
        if (localStorage.getItem("a2authLoginData") !== null && this.loggedIn === false) {
            console.log('loginFromSession()');
            var a2authLoginData = JSON.parse(localStorage.getItem("a2authLoginData"));
            console.log(a2authLoginData);
            this.login(a2authLoginData);
        }
    };
    AuthenticationService.prototype.logout = function () {
        this.loggedIn = false;
        this.emptyLoginData();
        localStorage.removeItem('a2authLoginData');
    };
    AuthenticationService.prototype.check = function () {
        return true;
        //if (localStorage.getItem("a2authLoginData") === null) {
        //    console.log('Auth.check: Login false');
        //    return false;
        //}
        //var a2authLoginData = JSON.parse(localStorage.getItem("a2authLoginData"));
        //// session exits therefore, make at it login
        //if (a2authLoginData.token) {
        //    console.log('Auth.check: Login true');
        //    this.loginFromSession();
        //    return true;
        //}
    };
    AuthenticationService.prototype.emptyLoginData = function () {
        this.loginData = null;
    };
    AuthenticationService.prototype.getRole = function () {
        return this.loginData.roleName;
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [config_service_1.ConfigService, http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authetication.service.js.map