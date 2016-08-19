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
var dashboard_service_1 = require('./services/dashboard.service');
var angular2_polymer_1 = require('@vaadin/angular2-polymer');
var HRMDasboardComponent = (function () {
    function HRMDasboardComponent(_dashboardService) {
        this._dashboardService = _dashboardService;
        this.dashboardModelList = [];
    }
    HRMDasboardComponent.prototype.ngOnInit = function () {
        this.getDetails();
    };
    HRMDasboardComponent.prototype.getDetails = function () {
        var _this = this;
        this._dashboardService.getHRHeadDetails().then(function (data) {
            _this.dashboardModelList = data;
            // Temp data -> This can be reomved - Surya
            // Different notifiations are shown in UI
            //data.forEach((item) => {
            //    this.dashboardModelList.push({
            //        empCode: item.empCode, empID: item.empID, empName: item.empName, hrAdvisor: item.hrAdvisor,
            //        remarks: item.remarks, notificationType: "PA"
            //    });
            //    this.dashboardModelList.push({
            //        empCode: item.empCode, empID: item.empID, empName: item.empName, hrAdvisor: item.hrAdvisor,
            //        remarks: item.remarks, notificationType: "IT"
            //    });
            //    this.dashboardModelList.push({
            //        empCode: item.empCode, empID: item.empID, empName: item.empName, hrAdvisor: item.hrAdvisor,
            //        remarks: item.remarks, notificationType: "Finance"
            //    });
            //    this.dashboardModelList.push({
            //        empCode: item.empCode, empID: item.empID, empName: item.empName, hrAdvisor: item.hrAdvisor,
            //        remarks: item.remarks, notificationType: "Admin"
            //    });
            //    this.dashboardModelList.push({
            //        empCode: item.empCode, empID: item.empID, empName: item.empName, hrAdvisor: item.hrAdvisor,
            //        remarks: item.remarks, notificationType: "KRA"
            //    });
            //    this.dashboardModelList.push({
            //        empCode: item.empCode, empID: item.empID, empName: item.empName, hrAdvisor: item.hrAdvisor,
            //        remarks: item.remarks, notificationType: "TRSbmitForApproval"
            //    });
            //    this.dashboardModelList.push({
            //        empCode: item.empCode, empID: item.empID, empName: item.empName, hrAdvisor: item.hrAdvisor,
            //        remarks: item.remarks, notificationType: "KRAReview"
            //    });
            //    this.dashboardModelList.push({
            //        empCode: item.empCode, empID: item.empID, empName: item.empName, hrAdvisor: item.hrAdvisor,
            //        remarks: item.remarks, notificationType: "KRARejected"
            //    });
            //    this.dashboardModelList.push({
            //        empCode: item.empCode, empID: item.empID, empName: item.empName, hrAdvisor: item.hrAdvisor,
            //        remarks: item.remarks, notificationType: "KRAApprove"
            //    });
            //});
        });
    };
    HRMDasboardComponent = __decorate([
        core_1.Component({
            // moduleId: module.id,
            selector: 'ap-hrm-dashboard',
            templateUrl: './app/hrm.dashboard.component.html',
            styleUrls: ['./app/dashboard.component.css'],
            providers: [dashboard_service_1.DashboardService],
            directives: [
                //PolymerElement('vaadin-grid'),
                angular2_polymer_1.PolymerElement('paper-card')]
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], HRMDasboardComponent);
    return HRMDasboardComponent;
}());
exports.HRMDasboardComponent = HRMDasboardComponent;
//# sourceMappingURL=hrm.dashboard.component.js.map