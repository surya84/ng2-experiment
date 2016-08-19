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
var http_1 = require('@angular/http');
var moment = require('moment');
var router_1 = require('@angular/router');
var angular2_polymer_1 = require('@vaadin/angular2-polymer');
var associate_model_1 = require('./models/associate.model');
var NewAssociateComponent = (function () {
    function NewAssociateComponent(_router, _http) {
        this._router = _router;
        this._http = _http;
        this.grades = [];
        this.designations = [];
        this.genders = ['Male', 'Female'];
        this.maritalStatuses = ['Single', 'Married', 'Divorced'];
        this.empTypes = [];
        this.technologies = [];
        this.departments = [];
        this.hradvisors = [];
        this.newAssociate = new associate_model_1.Associate();
        this._api = JSON.parse(sessionStorage["AsscoiatePortal_Configuration"]).API;
        // this._associateStore = new DataStore<any>(this._api.Associate);
        var _config = JSON.parse(sessionStorage["AsscoiatePortal_Configuration"]);
        this._apiURL = _config.ServerUrl;
    }
    NewAssociateComponent.prototype.ngOnInit = function () {
        this.getEmployeeTypes();
        this.getDepartment();
        this.getDesignation();
        this.getGrade();
        this.getHRAdvisor();
        this.getTechnology();
        // (new DataStore<any>(this._api.EmployeeType).list().subscribe((res) => (this.empTypes = res)));
        // (new DataStore<any>(this._api.Grade).list().subscribe((res) => { this.grades = res }));
        // (new DataStore<any>(this._api.Department).list().subscribe((res) => (this.departments = res)));
        // (new DataStore<any>(this._api.HRAdvisor).list().subscribe((res) => { this.hradvisors = res; }));
        // (new DataStore<any>(this._api.Designation).list().subscribe((res) => (this.designations = res)));
        // (new DataStore<any>(this._api.Technology).list().subscribe((res) => (this.technologies = res)));
    };
    NewAssociateComponent.prototype.getEmployeeTypes = function () {
        var _this = this;
        var url = this._apiURL + this._api.EmployeeType.list;
        this._http.get(url)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return (_this.empTypes = res); });
    };
    NewAssociateComponent.prototype.getGrade = function () {
        var _this = this;
        var url = this._apiURL + this._api.Grade.list;
        this._http.get(url)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return (_this.grades = res); });
    };
    NewAssociateComponent.prototype.getDepartment = function () {
        var _this = this;
        var url = this._apiURL + this._api.Department.list;
        this._http.get(url)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return (_this.departments = res); });
    };
    NewAssociateComponent.prototype.getHRAdvisor = function () {
        var _this = this;
        var url = this._apiURL + this._api.HRAdvisor.list;
        this._http.get(url)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return (_this.hradvisors = res); });
    };
    NewAssociateComponent.prototype.getDesignation = function () {
        var _this = this;
        var url = this._apiURL + this._api.Designation.list;
        this._http.get(url)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return (_this.designations = res); });
    };
    NewAssociateComponent.prototype.getTechnology = function () {
        var _this = this;
        var url = this._apiURL + this._api.Technology.list;
        this._http.get(url)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return (_this.technologies = res); });
    };
    NewAssociateComponent.prototype.onCreate = function () {
        var dob = this.newAssociate.dob;
        var jDate = this.newAssociate.dateOfJoining;
        if (moment(dob).isSameOrAfter(new Date())) {
            swal("", "Date of birth should be less than today", "warning");
            return false;
        }
        if (moment(jDate).isSameOrBefore(new Date())) {
            swal("", "Joining date should be greter than today", "warning");
            return false;
        }
        console.log(this.newAssociate);
        // this._associateStore.create(this.newAssociate).subscribe((res) => {
        //   this.newAssociate.ID = res;
        //   this._router.navigate(['/ap/associates/prospective-associates']);
        // });
        return false;
    };
    NewAssociateComponent.prototype.onCancel = function () {
        this._router.navigate(['/ap/dashboard']);
    };
    NewAssociateComponent.prototype.onClear = function () {
        this.newAssociate.ID = 0;
        this.newAssociate.firstName = "";
        this.newAssociate.middleName = "";
        this.newAssociate.lastName = "";
        this.newAssociate.dob = null;
        this.newAssociate.gradeID = 0;
        this.newAssociate.gender = "";
        this.newAssociate.maritalStatus = "";
        this.newAssociate.dateOfJoining = null;
        this.newAssociate.designationID = 0;
        this.newAssociate.technologyID = 0;
        this.newAssociate.deptID = 0;
        this.newAssociate.hrAdvisor = "";
        this.newAssociate.recruitedBy = "";
        this.newAssociate.employmentType = "";
    };
    NewAssociateComponent.prototype.onUpdate = function () {
    };
    NewAssociateComponent.prototype.onFiltersChanged = function (event) {
    };
    NewAssociateComponent.prototype.selected = function (grid) {
    };
    NewAssociateComponent = __decorate([
        core_1.Component({
            selector: 'new-associate',
            templateUrl: './app/new.associate.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, angular2_polymer_1.PolymerElement('vaadin-date-picker'), angular2_polymer_1.PolymerElement('paper-input'), angular2_polymer_1.PolymerElement('vaadin-combo-box')],
            styleUrls: ["app/new.associate.component.css"]
        }), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http])
    ], NewAssociateComponent);
    return NewAssociateComponent;
}());
exports.NewAssociateComponent = NewAssociateComponent;
//# sourceMappingURL=new.associate.component.js.map