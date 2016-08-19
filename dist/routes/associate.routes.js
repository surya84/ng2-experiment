"use strict";
var new_associate_component_1 = require('../new.associate.component');
var prospective_associate_component_1 = require('../prospective.associate.component');
var list_associate_component_1 = require('../list.associate.component');
var edit_associate_component_1 = require('../edit.associate.component');
exports.ASSOCIATE_ROUTER_PROVIDERS = [
    { path: '', component: list_associate_component_1.ListAssociatesComponent },
    { path: 'new', component: new_associate_component_1.NewAssociateComponent },
    { path: 'prospective-associates', component: prospective_associate_component_1.ProspectiveAssociateComponent },
    { path: 'list', component: list_associate_component_1.ListAssociatesComponent },
    { path: 'edit/:id', component: edit_associate_component_1.EditAssociateComponent }
];
//# sourceMappingURL=associate.routes.js.map