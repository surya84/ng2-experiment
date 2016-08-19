"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('../login/login.component');
var _layout_component_1 = require('../shared/shell/_layout.component');
var dashboard_component_1 = require('../dashboard.component');
var associate_component_1 = require('../associate.component');
var new_associate_component_1 = require('../new.associate.component');
var prospective_associate_component_1 = require('../prospective.associate.component');
var list_associate_component_1 = require('../list.associate.component');
var edit_associate_component_1 = require('../edit.associate.component');
var admin_component_1 = require('../admin.component');
var lookup_component_1 = require('../shared/lookup/lookup.component');
exports.routes = [
    { path: '', component: login_component_1.LoginComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    {
        path: 'ap', component: _layout_component_1.MasterLayoutComponent,
        children: [
            {
                path: '*', component: dashboard_component_1.DashboardComponent
            },
            { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
            {
                path: 'associates', component: associate_component_1.AssociateComponent,
                children: [
                    { path: '', component: list_associate_component_1.ListAssociatesComponent },
                    { path: 'new', component: new_associate_component_1.NewAssociateComponent },
                    { path: 'prospective-associates', component: prospective_associate_component_1.ProspectiveAssociateComponent },
                    { path: 'list', component: list_associate_component_1.ListAssociatesComponent },
                    { path: 'edit/:id', component: edit_associate_component_1.EditAssociateComponent }
                ]
            },
            {
                path: 'admin', component: admin_component_1.AdminComponent, pathMatch: 'prefix',
                children: [
                    {
                        path: 'lookup/:type', component: lookup_component_1.LookupComponent, pathMatch: 'full',
                    }
                ]
            }
        ]
    }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map