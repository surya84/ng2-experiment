import { Component, Injector, OnInit, Inject } from '@angular/core';
import { CORE_DIRECTIVES,
  FormBuilder,
  Validators,
  Control,
  ControlGroup,
  FORM_DIRECTIVES, NgIf } from '@angular/common';
import { Http } from '@angular/http';
import * as moment from 'moment';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { PolymerElement } from '@vaadin/angular2-polymer';

import { IDataStore } from './shared/dataStore';
import { EmployeeType, Grade, Department, HRAdvisor, Designation, Technology } from './models/index';
import { Associate } from './models/associate.model';
import { ConfigService } from './config/config.service';
//import { Util } from '../../utility/util';
declare var swal: any;

@Component({
  selector: 'new-associate',
  templateUrl: './app/new.associate.component.html',
  directives: [ROUTER_DIRECTIVES, PolymerElement('vaadin-date-picker'), PolymerElement('paper-input'), PolymerElement('vaadin-combo-box')],
  styleUrls: [`app/new.associate.component.css`]
})
export class NewAssociateComponent implements OnInit {
  private newAssociate: Associate;
  private _associateStore: IDataStore<any>;
  private _api: any;
  private _apiURL: any;

  grades: any[] = [];
  designations: any[] = [];
  genders = ['Male', 'Female'];
  maritalStatuses = ['Single', 'Married', 'Divorced'];
  empTypes: any[] = [];
  technologies: any[] = [];
  departments: any[] = [];
  hradvisors: any[] = [];

  constructor(private _router: Router, private _http: Http) {
    this.newAssociate = new Associate();
    this._api = JSON.parse(sessionStorage["AsscoiatePortal_Configuration"]).API;
    // this._associateStore = new DataStore<any>(this._api.Associate);

    let _config = JSON.parse(sessionStorage["AsscoiatePortal_Configuration"]);
    this._apiURL = _config.ServerUrl;
  }

  ngOnInit() {
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
  }

  private getEmployeeTypes() {
    let url = this._apiURL + this._api.EmployeeType.list;
    this._http.get(url)
      .map((res) => res.json())
      //.catch((err) => Util.handleError(err))
      .subscribe((res) => (this.empTypes = res));
  }

  private getGrade() {
    let url = this._apiURL + this._api.Grade.list;
    this._http.get(url)
      .map((res) => res.json())
      //.catch((err) => Util.handleError(err))
      .subscribe((res) => (this.grades = res));
  }

  private getDepartment() {
    let url = this._apiURL + this._api.Department.list;
    this._http.get(url)
      .map((res) => res.json())
      // .catch((err) => Util.handleError(err))
      .subscribe((res) => (this.departments = res));
  }

  private getHRAdvisor() {
    let url = this._apiURL + this._api.HRAdvisor.list;
    this._http.get(url)
      .map((res) => res.json())
      // .catch((err) => Util.handleError(err))
      .subscribe((res) => (this.hradvisors = res));
  }

  private getDesignation() {
    let url = this._apiURL + this._api.Designation.list;
    this._http.get(url)
      .map((res) => res.json())
      //.catch((err) => Util.handleError(err))
      .subscribe((res) => (this.designations = res));
  }

  private getTechnology() {
    let url = this._apiURL + this._api.Technology.list;
    this._http.get(url)
      .map((res) => res.json())
      //.catch((err) => Util.handleError(err))
      .subscribe((res) => (this.technologies = res));
  }

  onCreate() {
    let dob = this.newAssociate.dob;
    let jDate = this.newAssociate.dateOfJoining;

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
  }

  onCancel() {
    this._router.navigate(['/ap/dashboard']);
  }

  onClear() {
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
  }

  onUpdate() {

  }

  onFiltersChanged(event: any) {

  }

  selected(grid: any) {

  }
}