import { Injectable, Inject } from '@angular/core';
import { Associate } from '../models/associate.model';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
//import { Util } from 'app/utility/util';
import 'rxjs/Rx';

@Injectable()
export class AssociateService {
    private _resources: any;
    private _serverURL: string;
    constructor( @Inject(Http) private _http: Http) {
        let _config = JSON.parse(sessionStorage["AsscoiatePortal_Configuration"]);
        this._serverURL = _config.ServerUrl;
        this._resources = _config.API.Associate;
    }

    public list(): Observable<Associate> {
        var url = this._serverURL + this._resources.list;

        return this._http.get(url)
            .map((res) => res.json())
           // .catch((err) => Util.handleError(err));
    }
}

