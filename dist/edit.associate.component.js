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
var router_1 = require('@angular/router');
var index_1 = require('./models/index');
var EditAssociateComponent = (function () {
    function EditAssociateComponent(actRoute) {
        var _this = this;
        this.actRoute = actRoute;
        this.id = 0;
        this.newAssociate = new index_1.Associate();
        this.actRoute.params
            .subscribe(function (params) {
            _this.id = params['id'];
        });
    }
    EditAssociateComponent.prototype.ngOnInit = function () {
        this.newAssociate.firstName = "Surya!";
    };
    EditAssociateComponent.prototype.onUpdate = function () {
    };
    __decorate([
        core_1.ViewChild("assocaiteForm"), 
        __metadata('design:type', Object)
    ], EditAssociateComponent.prototype, "assocaiteForm", void 0);
    EditAssociateComponent = __decorate([
        core_1.Component({
            //moduleId: module.id,
            selector: 'edit-associate',
            templateUrl: './app/edit.associate.component.html',
            styleUrls: ["./app/edit.associate.component.css"]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute])
    ], EditAssociateComponent);
    return EditAssociateComponent;
}());
exports.EditAssociateComponent = EditAssociateComponent;
//# sourceMappingURL=edit.associate.component.js.map