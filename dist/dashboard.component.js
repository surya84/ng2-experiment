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
var common_1 = require('@angular/common');
var hrm_dashboard_component_1 = require('./hrm.dashboard.component');
var sysadmin_dashboard_component_1 = require('./sysadmin.dashboard.component');
var dashboard_service_1 = require('./services/dashboard.service');
var DashboardComponent = (function () {
    function DashboardComponent() {
        // let injector: Injector = AppInjector();
        // this._authService = injector.get(Authentication);
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.roleName = JSON.parse(sessionStorage["AsscoiatePortal_UserInformation"]).roleName; //this._authService.getRole();
    };
    DashboardComponent = __decorate([
        core_1.Component({
            // moduleId: module.id,
            selector: 'ap-dashboard',
            template: "<div [ngSwitch]=\"roleName\">\n                    <div *ngSwitchCase=\"'HRM'\">\n                        <ap-hrm-dashboard></ap-hrm-dashboard>\n                    </div>\n                    <div *ngSwitchCase=\"'SystemAdmin'\">\n                       <ap-sysadmin-dashboard></ap-sysadmin-dashboard>\n                    </div>\n                    <div *ngSwitchDefault>I am default! No role found</div>\n                </div>\n                ",
            directives: [common_1.NgSwitch, common_1.NgSwitchDefault, hrm_dashboard_component_1.HRMDasboardComponent, sysadmin_dashboard_component_1.SysAdminDasboardComponent],
            providers: [dashboard_service_1.DashboardService]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map