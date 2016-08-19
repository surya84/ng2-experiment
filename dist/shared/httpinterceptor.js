"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var HttpInterceptor = (function (_super) {
    __extends(HttpInterceptor, _super);
    function HttpInterceptor(backend, defaultOptions, _router) {
        _super.call(this, backend, defaultOptions);
        this._router = _router;
    }
    HttpInterceptor.prototype.request = function (url, options) {
        return this.intercept(_super.prototype.request.call(this, url, options));
    };
    HttpInterceptor.prototype.get = function (url, options) {
        return this.intercept(_super.prototype.get.call(this, url, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.post = function (url, body, options) {
        if (url.indexOf('UserLogin') > 0) {
            return this.intercept(_super.prototype.post.call(this, url, body, options));
        }
        return this.intercept(_super.prototype.post.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.put = function (url, body, options) {
        return this.intercept(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.delete = function (url, options) {
        return this.intercept(_super.prototype.delete.call(this, url, options));
    };
    HttpInterceptor.prototype.getRequestOptionArgs = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        //  options.headers.append('Content-Type', 'application/json');
        if (sessionStorage["token"]) {
            options.headers.append("Authorization", "bearer " + sessionStorage["token"]);
        }
        return options;
    };
    HttpInterceptor.prototype.intercept = function (observable) {
        var _this = this;
        return observable.catch(function (err, source) {
            // !_.endsWith(err.url, 'api/auth/login')
            if (err.status == 401) {
                _this._router.navigate(['./login']);
                return Observable_1.Observable.empty();
            }
            else {
                return Observable_1.Observable.throw(err);
            }
        });
    };
    return HttpInterceptor;
}(http_1.Http));
exports.HttpInterceptor = HttpInterceptor;
//# sourceMappingURL=httpinterceptor.js.map