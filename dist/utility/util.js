"use strict";
var Observable_1 = require('rxjs/Observable');
var Util = (function () {
    function Util() {
    }
    Util.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        return res.json();
    };
    Util.handleError = function (error) {
        var errMsg = error._body || error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    return Util;
}());
exports.Util = Util;
//# sourceMappingURL=util.js.map