import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

@Component({
    // moduleId: module.id,
    selector: 'ap-sysadmin-dashboard',
    template: '<h1>I am sysadmin Dashboard; count: {{count}}</h1>',
    providers: [DashboardService]
})
export class SysAdminDasboardComponent implements OnInit {
    notificationCount: Number;
    constructor(private _dashboardService: DashboardService) {
    }

    ngOnInit() {
        this._dashboardService.getDashboardNotificationCount();
        this.notificationCount = this._dashboardService.notificationCount;
    }
}