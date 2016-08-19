import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
// import * as CryptoJS from 'crypto-js';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IUser, User } from '../models';

@Injectable()
export class AuthenticationService {
    public loggedIn: Boolean;
    public loginData: IUser;
    private _authInformation: any;

    constructor(private _config: ConfigService, private _http: Http) {
        this.loggedIn = false;
        this.emptyLoginData();
    }

    login(loginData: IUser) {
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

        const data = "grant_type=password&username=" + this.loginData.email + "&password=" + this.loginData.password;
        const url = this._config.get("ServerUrl") + "/UserLogin";

        return new Promise((resolve, reject) => {
            this._http.post(url, data)
                .map(res => res.json())
                //.catch((error: Response) => {
                //    reject(error);
                //    return Observable.throw(error.json().error || 'Server error');
                //})
                .subscribe((lData) => {
                    // console.log(lData);
                    sessionStorage["token"] = lData.access_token;
                    this.loginData.roleName = lData.role;
                    if (lData.userName.indexOf("@") > 0) {
                        var uname = lData.userName.split("@");

                        if (uname.length > 1 && uname[0].indexOf(".") > 0) {
                            this.loginData.firstName = uname[0].split(".")[0];
                            this.loginData.lastName = uname[0].split(".")[1];

                            this.loginData.fullName = this.loginData.firstName + ' ' + this.loginData.lastName;
                        }
                    }
                    sessionStorage["AsscoiatePortal_UserInformation"] = JSON.stringify(this.loginData);
                    resolve(lData);
                }, error => reject(error));

        });
    }

    loginFromSession() {
        // load from session
        if (localStorage.getItem("a2authLoginData") !== null && this.loggedIn === false) {
            console.log('loginFromSession()');
            var a2authLoginData = JSON.parse(localStorage.getItem("a2authLoginData"));
            console.log(a2authLoginData);
            this.login(a2authLoginData);
        }
    }

    logout() {
        this.loggedIn = false;
        this.emptyLoginData();
        localStorage.removeItem('a2authLoginData');
    }

    check() {
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
    }

    emptyLoginData() {
        this.loginData = null;
    }

    getRole(): string {
        return this.loginData.roleName;
    }
}
