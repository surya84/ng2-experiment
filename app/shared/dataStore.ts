import { IDataStore } from '../interfaces/idatastore';
import { Inject, Injector, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AppInjector } from './injector';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ResourceUrl } from '../models/index';
import { ConfigService } from '../config/config.service';
import { Util } from '../utility/util';
declare var swal:any;

@Injectable()
export class DataStore<T> implements IDataStore<T> {
    //private _config: ConfigService;
    private _serverURL: string;
    private _http: Http;

    constructor(private _url: ResourceUrl) {
        if (this._url == null) {
            throw new Error("No endpoints were provided!");
        }

        let injector: Injector = AppInjector();
        this._http = injector.get(Http);
        // this._config = injector.get(ConfigService);

        // if (!this._config.isReady()) {
        //     throw new Error("Config was not loaded!");
        // }
        let _config = JSON.parse(sessionStorage["AsscoiatePortal_Configuration"]);
        this._serverURL = _config.ServerUrl;
    }

    //region Not Implemented
    getById(id: number): Observable<T> {
        if (!this._url.getById) {
            throw new Error("getById resource not provided!");
        }

        var url = this._serverURL + this._url.getById;

        return this._http.get(url)
            .map((res) => Util.extractData(res))
            .catch((err) => Util.handleError(err));
    }

    getByCode(code: string): Observable<T> {
        if (!this._url.getByCode) {
            throw new Error("getById resource not provided!");
        }

        var url = this._serverURL + this._url.getByCode;

        return this._http.get(url)
            .map((res) => Util.extractData(res))
            .catch((err) => Util.handleError(err));
    }

    update(obj: any): Observable<T> {
        if (!this._url.update) {
            //throw new Error("update resource not provided!");
            swal("update resource not provided!", "", "error");
            return Observable.throw("update resource not provided!");
        }

        var url = this._serverURL + this._url.update;

        return this._http.post(url, obj)
            .map((res) => Util.extractData(res))
            .catch((err) => Util.handleError(err));
    }

    delete(id: number): Observable<T> {
        if (!this._url.delete) {
            throw new Error("delete resource not provided!");
        }

        var url = this._serverURL + this._url.delete;

        return this._http.get(url)
            .map((res) => Util.extractData(res))
            .catch((err) => Util.handleError(err));
    }

    create(obj: any): Observable<number> {
        if (!this._url.create) {
            swal("create resource not provided!", "", "error");
            return Observable.throw("create resource not provided!");
        }

        var url = this._serverURL + this._url.create;

        return this._http.post(url, obj)
            .map((res) => Util.extractData(res))
            .catch((err) => Util.handleError(err));
    }
    //endregion

    list(): Observable<T[]> {
        if (!this._url.list) {
            throw new Error("list resource not provided!");
        }

        var url = this._serverURL + this._url.list;

        return this._http.get(url)
            .map((res) => Util.extractData(res))
            .catch((err) => Util.handleError(err));
    }

}

export { IDataStore }