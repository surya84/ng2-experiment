import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { Response } from '@angular/http';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { SearchFilters, IFilter } from './shared/search-filter/searchfilter.component';
import { DataStore, IDataStore } from './shared/datastore';

export interface HRMDasboardModel {
    notificationType: string;
    empID: string;
    empCode: string;
    empName: string;
    hrAdvisor: string;
    remarks: string;
}

@Component({
    // moduleId: module.id,
    selector: 'ap-hrm-dashboard',
    templateUrl: './app/hrm.dashboard.component.html',
    styleUrls: ['./app/dashboard.component.css'],
    providers: [DashboardService],
    directives: [
        //PolymerElement('vaadin-grid'),
        PolymerElement('paper-card')]
})
export class HRMDasboardComponent implements OnInit {
    dashboardModelList: Array<HRMDasboardModel>;
    constructor(private _dashboardService: DashboardService) {
        this.dashboardModelList = [];
    }

    ngOnInit() {
        this.getDetails();
    }

    getDetails() {
        this._dashboardService.getHRHeadDetails().then((data: HRMDasboardModel[]) => {
            this.dashboardModelList = data;

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
    }
}