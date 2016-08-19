import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ConfigService {

    private _config: Object
    private _env: Object
    private _configCustom: Object
    private _loaded: boolean;
    private _lookupData: {};


    public get lookupConfig(): {} {
        return this._lookupData;
    }


    constructor(private http: Http) {
    }

    isReady() {
        return this._loaded;
    }

    load() {
        return new Promise((resolve, reject) => {
            if (this._loaded) {
                resolve(true);
                return true;
            }

            this.http.get('app/config/env.json')
                .map(res => res.json())
                .subscribe((env_data) => {
                    this._env = env_data;
                    console.log(env_data);
                    this.http.get('app/config/' + env_data.env + '.json')
                        .map(res => res.json())
                        .catch((error: any) => {
                            console.error(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe((data) => {
                            this._config = data;
                            sessionStorage["AsscoiatePortal_Configuration"] = JSON.stringify(data);
                            this._loaded = true;
                            console.log(data);
                            resolve(true);
                        });
                });

        });
    }

    loadLookupConfig() {
        return new Promise((resolve, reject) => {
            if (this._lookupData) {
                resolve(true);
                return true;
            }

            this.http.get('app/config/lookup.json')
                .map(res => res.json())
                .subscribe((lookupData) => {
                    this._lookupData = lookupData;
                    resolve(true);
                    console.log(lookupData);
                });
        });
    }

    getEnv(key: any) {
        return this._env[key];
    }

    get(key: any): any {
        if (!this._config) {
            throw new Error("Config was not loaded");
        }
        return this._config[key];
    }

    setCustom(key: any, val: any) {
        this._configCustom[key] = val;
    }

    getCustom(key: any) {
        return this._configCustom[key];
    }

};