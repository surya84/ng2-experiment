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
var http_1 = require('@angular/http');
//import { DataStore, IDataStore } from '../../implementations/datastore';
var angular2_polymer_1 = require('@vaadin/angular2-polymer');
//import { ConfigService } from '../config/config.service';
var moment = require('moment');
var associate_service_1 = require('./services/associate.service');
var searchfilter_component_1 = require('./shared/search-filter/searchfilter.component');
var ProspectiveAssociateComponent = (function () {
    function ProspectiveAssociateComponent(_http, _service) {
        this._http = _http;
        this._service = _service;
        var configData = JSON.parse(sessionStorage["AsscoiatePortal_Configuration"]);
        //this._service = new DataStore<Associate>(configData.API.Associate);
        this.grdPAssociatesColumns = [
            { name: "name", displayName: "Name", type: "string" },
            { name: "technology", displayName: "Technology", type: "string" },
            { name: "designation", displayName: "Designation", type: "string" },
            { name: "department", displayName: "Department", type: "string" },
            { name: "joiningDate", displayName: "DOJ", type: "date" },
            { name: "hrAdvisor", displayName: "HR Advisor", type: "string" },
        ];
    }
    ProspectiveAssociateComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.grdPAssociates.nativeElement.then(function () {
            _this.onGridReady(_this.grdPAssociates.nativeElement);
        });
    };
    ProspectiveAssociateComponent.prototype.selected = function (grid) {
        var selection = grid.selection.selected();
        if (selection.length === 1) {
            grid.selection.clear();
            grid.getItem(selection[0], function (err, item) {
                //            console.log(item);
            });
        }
    };
    ProspectiveAssociateComponent.prototype.onFiltersChanged = function (filter) {
        console.log(filter);
        if (Polymer && Polymer.isInstance(this.grdPAssociates)) {
            this.grdPAssociates.scrollToStart(0);
        }
        console.log(this._prosAssociates);
        var filtereddata = this._prosAssociates.filter(function (data) {
            if (filter.type == 'string') {
                return data[filter.name] && data[filter.name].search(new RegExp(filter.value.contains, "i")) > -1;
            }
            else if (filter.type == 'date') {
                if (data[filter.name]) {
                    var minDate = filter.value.min;
                    var maxDate = filter.value.max;
                    return moment(data[filter.name]).isBetween(moment(minDate), moment(maxDate));
                }
                else {
                    return false;
                }
            }
        });
        this.grdPAssociates.nativeElement.items = filtereddata;
        this.grdPAssociates.nativeElement.refreshItems();
    };
    ProspectiveAssociateComponent.prototype.onGridReady = function (grid) {
        var _this = this;
        grid.items = function (params, callback) {
            return _this._service.list().subscribe(function (res) { _this._prosAssociates = res; callback(res, res.length); });
        };
        grid.cellClassGenerator = function (cell) {
            // if (cell.columnName === 'status') {
            //     return 'status-' + cell.data.replace(/ /g, '-').toLowerCase();
            // }
        };
        grid.addEventListener('sort-order-changed', function (e) {
            var sortBy = grid.columns[e.detail.value[0].column].name;
            // this.sortOrder = { sortBy: sortBy, direction: e.detail.value[0].direction };
            // sort order is fired for the first time before grid has been initialized properly,
            // so scrolling will crash.
            try {
                grid.scrollToStart(0);
            }
            catch (err) {
            }
        });
        // grid.columns[5].renderer = (cell) => {
        //     // if (cell.data) {
        //     //     cell.element.innerHTML = moment(cell.data).format('YYYY-MM-DD');
        //     // } else {
        //     //     cell.element.innerHTML = "";
        //     // }
        // };
        grid.columns[8].renderer = function (cell) {
            // cell.element.innerHTML = "<i class='deleteIcon fa fa-times' aria-hidden='true' on-click='deletePAsscociate(" + cell.row.index + ")'></i>";
            //cell.element.innerHTML = "<a onclick='deletePAssociate(" + cell.row.index + ")'><paper-icon-button icon='delete'></paper-icon-button>Delete</a>";
            //cell.element.innerHTML = " <button (click)='deletePAssociate(" + cell.row.index + ")'>Delete</button>";
        };
    };
    __decorate([
        core_1.ViewChild('grdPAssociates'), 
        __metadata('design:type', Object)
    ], ProspectiveAssociateComponent.prototype, "grdPAssociates", void 0);
    ProspectiveAssociateComponent = __decorate([
        core_1.Component({
            selector: 'prospective-associate',
            directives: [searchfilter_component_1.SearchFilters, angular2_polymer_1.PolymerElement('vaadin-grid'), angular2_polymer_1.PolymerElement('iron-icon')],
            templateUrl: './app/prospective.associate.component.html',
            providers: [associate_service_1.AssociateService]
        }),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Inject(associate_service_1.AssociateService)), 
        __metadata('design:paramtypes', [http_1.Http, associate_service_1.AssociateService])
    ], ProspectiveAssociateComponent);
    return ProspectiveAssociateComponent;
}());
exports.ProspectiveAssociateComponent = ProspectiveAssociateComponent;
//# sourceMappingURL=prospective.associate.component.js.map