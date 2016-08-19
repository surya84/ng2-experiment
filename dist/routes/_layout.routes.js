"use strict";
var dashboard_component_1 = require('../dashboard.component');
var associate_component_1 = require('../associate.component');
var associate_routes_1 = require('./associate.routes');
exports.LAYOUT_ROUTER_PROVIDERS = [
    { path: '*', component: dashboard_component_1.DashboardComponent },
    { path: '/dashboard', component: dashboard_component_1.DashboardComponent },
    { path: '/associates', component: associate_component_1.AssociateComponent, children: associate_routes_1.ASSOCIATE_ROUTER_PROVIDERS }
];
//# sourceMappingURL=_layout.routes.js.map