import { Inject, Injector, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardService {
    private _roleName: string;
    private _serverURL: string;
    private _hrm: string;

    public notificationCount: number;
    constructor(private _http: Http) {
        let configData = JSON.parse(sessionStorage["AsscoiatePortal_Configuration"]);
        if (!configData) {
            throw new ReferenceError("Config was not loaded!");
        }

        let loginData = JSON.parse(sessionStorage["AsscoiatePortal_UserInformation"]);
        this._roleName = loginData.roleName;
        this._serverURL = configData.ServerUrl;
    }

    getDashboardNotificationCount() {
        let _url = this._serverURL;
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

        return this._http.get(_url).map(x => x.json());
    }

    getHRHeadDetails() {
        let _url = this._serverURL + "/Dashboard/GetHRHeadDetails";

        return new Promise((resolve, reject) => {
            this._http.get(_url)
                .map(res => res.json())
                .catch((error: any) => {
                    console.error(error);
                    reject(error);
                    return Observable.throw(error.json().error || 'Server error');
                })
                .subscribe((data) => {
                    resolve(data);
                });
        });
    }
}
