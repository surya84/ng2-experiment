import { Component, Injector, OnInit, Inject } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { AppInjector } from '../injector';
import { ConfigService } from '../../config/config.service';

import { IUser, User } from '../../models/index';

import { AuthenticationService } from '../../services/authetication.service';
import { DashboardService } from '../../services/dashboard.service';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { AssociateComponent } from '../../components/associate/associate.component';

declare var jQuery: any, swal: any;

@Component({
    // moduleId: module.id,
    selector: 'dashboard-layout',
    inputs: ['pageTitle', 'pageSubtitle'],
    templateUrl: 'app/shared/shell/_layout.component.html',
    directives: [ROUTER_DIRECTIVES, NgIf, PolymerElement('app-drawer'),
        PolymerElement('app-toolbar'),
        PolymerElement('app-drawer-layout'),
        PolymerElement('iron-pages'), PolymerElement('paper-icon-button'), PolymerElement('paper-item')],
    providers: [DashboardService],
    styles: [` a.active, a.active i { color: #FF8225; } a.active span { color: #FF8225; } app-toolbar {
      background-color: #4285f4;
      color: #fff;
    }`],
    //  precompile: [DashboardComponent, AssociateComponent]
})
export class MasterLayoutComponent implements OnInit {
    location = "Location";
    user = "Surya";
    todos = "Todo";
    route = "route";

    public loginData: IUser;
    public loggedIn: Boolean;
    public pageTitle: String;
    public pageSubtitle: String;
    public roleName: String;
    public notificationCount: number;

    //private _authService: Authentication;
    //private _dashboardService: DashboardService;

    constructor(private _router: Router, @Inject(ConfigService) private _configService: ConfigService, @Inject(AuthenticationService) private _authService: AuthenticationService,
        @Inject(DashboardService) private _dashboardService: DashboardService) {
        // let injector: Injector = AppInjector();

        // this._authService = injector.get(Authentication);
        // this._dashboardService = injector.get(DashboardService);
        this.loginData = JSON.parse(sessionStorage["AsscoiatePortal_UserInformation"]);

        if (!this.loginData) {
            throw new Error("Config was not loaded!");
        }

        // this.loginData = this._authService.loginData;
        // this.loggedIn = this._authService.loggedIn;

        this.roleName = this.loginData.roleName;
    }

    ngOnInit() {
        // if (!this._configService.isReady()) {
        //     this._router.navigate(['/dashboard']);
        //     return false;
        // }

        if (!this.loginData) {
            this._router.navigate(['/login']);
            return false;
        }

        this._dashboardService.getDashboardNotificationCount().subscribe(res => { this.notificationCount = res; });

        //Activate the layout maker
        jQuery.AdminLTE.layout.activate();
        //Enable sidebar tree view controls
        jQuery.AdminLTE.tree('.sidebar-menu');
    }

    logout() {
        this._authService.logout();
        this._router.navigate(['/Login']);
    }

    profile(event: Event) {
        event.stopPropagation();
        swal("Error", "Not implemented", "error");
    }

    navigate(event: any, tol: any, param: any) {
        event.stopPropagation();
        this._router.navigate([]);
        this._router.navigate([tol, param]);
    }
}
