"use strict";
var Associate = (function () {
    function Associate() {
    }
    Object.defineProperty(Associate.prototype, "name", {
        get: function () {
            return this.firstName + " " + this.middleName + " " + this.lastName;
        },
        enumerable: true,
        configurable: true
    });
    return Associate;
}());
exports.Associate = Associate;
//# sourceMappingURL=associate.model.js.map