import { Component, OnInit, Inject, Injector } from '@angular/core';
import { NgSwitch, NgSwitchDefault } from '@angular/common';
import { Http } from '@angular/http';
import { HRMDasboardComponent } from './hrm.dashboard.component';
import { SysAdminDasboardComponent } from './sysadmin.dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { AppInjector } from './shared/injector';
import { AuthenticationService } from './services/authetication.service';

@Component({
    // moduleId: module.id,
    selector: 'ap-dashboard',
    template: `<div [ngSwitch]="roleName">
                    <div *ngSwitchCase="'HRM'">
                        <ap-hrm-dashboard></ap-hrm-dashboard>
                    </div>
                    <div *ngSwitchCase="'SystemAdmin'">
                       <ap-sysadmin-dashboard></ap-sysadmin-dashboard>
                    </div>
                    <div *ngSwitchDefault>I am default! No role found</div>
                </div>
                `,
    directives: [NgSwitch, NgSwitchDefault, HRMDasboardComponent, SysAdminDasboardComponent],
    providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
    public roleName: string;
    private _authService: AuthenticationService;

    constructor() {
        // let injector: Injector = AppInjector();
        // this._authService = injector.get(Authentication);
    }

    ngOnInit() {
        this.roleName = JSON.parse(sessionStorage["AsscoiatePortal_UserInformation"]).roleName; //this._authService.getRole();
    }
}