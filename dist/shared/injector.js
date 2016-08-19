"use strict";
var appInjectorRef;
exports.AppInjector = function (injector) {
    if (injector) {
        appInjectorRef = injector;
    }
    return appInjectorRef;
};
//# sourceMappingURL=injector.js.map