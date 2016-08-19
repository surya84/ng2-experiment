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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var angular2_polymer_1 = require('@vaadin/angular2-polymer');
var config_service_1 = require('../../config/config.service');
var authetication_service_1 = require('../../services/authetication.service');
var dashboard_service_1 = require('../../services/dashboard.service');
var MasterLayoutComponent = (function () {
    //private _authService: Authentication;
    //private _dashboardService: DashboardService;
    function MasterLayoutComponent(_router, _configService, _authService, _dashboardService) {
        // let injector: Injector = AppInjector();
        this._router = _router;
        this._configService = _configService;
        this._authService = _authService;
        this._dashboardService = _dashboardService;
        this.location = "Location";
        this.user = "Surya";
        this.todos = "Todo";
        this.route = "route";
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
    MasterLayoutComponent.prototype.ngOnInit = function () {
        // if (!this._configService.isReady()) {
        //     this._router.navigate(['/dashboard']);
        //     return false;
        // }
        var _this = this;
        if (!this.loginData) {
            this._router.navigate(['/login']);
            return false;
        }
        this._dashboardService.getDashboardNotificationCount().subscribe(function (res) { _this.notificationCount = res; });
        //Activate the layout maker
        jQuery.AdminLTE.layout.activate();
        //Enable sidebar tree view controls
        jQuery.AdminLTE.tree('.sidebar-menu');
    };
    MasterLayoutComponent.prototype.logout = function () {
        this._authService.logout();
        this._router.navigate(['/Login']);
    };
    MasterLayoutComponent.prototype.profile = function (event) {
        event.stopPropagation();
        swal("Error", "Not implemented", "error");
    };
    MasterLayoutComponent.prototype.navigate = function (event, tol, param) {
        event.stopPropagation();
        this._router.navigate([]);
        this._router.navigate([tol, param]);
    };
    MasterLayoutComponent = __decorate([
        core_1.Component({
            // moduleId: module.id,
            selector: 'dashboard-layout',
            inputs: ['pageTitle', 'pageSubtitle'],
            templateUrl: 'app/shared/shell/_layout.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, common_1.NgIf, angular2_polymer_1.PolymerElement('app-drawer'),
                angular2_polymer_1.PolymerElement('app-toolbar'),
                angular2_polymer_1.PolymerElement('app-drawer-layout'),
                angular2_polymer_1.PolymerElement('iron-pages'), angular2_polymer_1.PolymerElement('paper-icon-button'), angular2_polymer_1.PolymerElement('paper-item')],
            providers: [dashboard_service_1.DashboardService],
            styles: [" a.active, a.active i { color: #FF8225; } a.active span { color: #FF8225; } app-toolbar {\n      background-color: #4285f4;\n      color: #fff;\n    }"],
        }),
        __param(1, core_1.Inject(config_service_1.ConfigService)),
        __param(2, core_1.Inject(authetication_service_1.AuthenticationService)),
        __param(3, core_1.Inject(dashboard_service_1.DashboardService)), 
        __metadata('design:paramtypes', [router_1.Router, config_service_1.ConfigService, authetication_service_1.AuthenticationService, dashboard_service_1.DashboardService])
    ], MasterLayoutComponent);
    return MasterLayoutComponent;
}());
exports.MasterLayoutComponent = MasterLayoutComponent;
//# sourceMappingURL=_layout.component.js.map