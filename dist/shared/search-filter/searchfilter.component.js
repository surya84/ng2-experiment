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
var angular2_polymer_1 = require('@vaadin/angular2-polymer');
var moment = require('moment');
var SearchFilters = (function () {
    function SearchFilters() {
        this.filtersChange = new core_1.EventEmitter();
        this.activeFilterCount = 0;
        this.selectedFilterColumn = { name: "", displayName: "", type: "", value: { contains: "" } };
    }
    SearchFilters.prototype.ngAfterViewInit = function () {
        this.minDate.nativeElement.i18n.formatDate = function (d) {
            return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/');
        };
        this.maxDate.nativeElement.i18n.formatDate = function (d) {
            return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/');
        };
    };
    SearchFilters.prototype.filtersChanged = function (event) {
        var changedValue = event.detail.value;
        if (changedValue) {
            changedValue.value = { contains: "" };
        }
        this.selectedFilterColumn = changedValue;
        if (!this.selectedFilterColumn) {
            this.selectedFilterColumn = { name: "", displayName: "", type: "", value: { contains: "" } };
        }
    };
    SearchFilters.prototype.onSearch = function () {
        if (!this.selectedFilterColumn || !this.selectedFilterColumn.name) {
            this.searchFilterToast.nativeElement.text = "Please select a filter";
            this.searchFilterToast.nativeElement.open();
            return;
        }
        if (this.selectedFilterColumn.type == 'string' && (!this.selectedFilterColumn.value || !this.selectedFilterColumn.value.contains)) {
            this.searchFilterToast.nativeElement.text = "Please specify a value";
            this.searchFilterToast.nativeElement.open();
            return;
        }
        if (this.selectedFilterColumn.type == 'date') {
            if (!this.selectedFilterColumn.value || !this.selectedFilterColumn.value.min || !this.selectedFilterColumn.value.max) {
                this.searchFilterToast.nativeElement.text = "Please specify a value";
                this.searchFilterToast.nativeElement.open();
                return;
            }
            if (moment(this.selectedFilterColumn.value.max).isBefore(this.selectedFilterColumn.value.min)) {
                this.searchFilterToast.nativeElement.text = "Max date cannot be lessthan min date";
                this.searchFilterToast.nativeElement.open();
                return;
            }
        }
        this.filtersChange.emit(this.selectedFilterColumn);
    };
    SearchFilters.prototype.onClear = function () {
        this.selectedFilterColumn = { name: "", displayName: "", type: "", value: { contains: "" } };
        this.filtersChange.emit(this.selectedFilterColumn);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SearchFilters.prototype, "columns", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SearchFilters.prototype, "filtersChange", void 0);
    __decorate([
        core_1.ViewChild('minDate'), 
        __metadata('design:type', Object)
    ], SearchFilters.prototype, "minDate", void 0);
    __decorate([
        core_1.ViewChild('maxDate'), 
        __metadata('design:type', Object)
    ], SearchFilters.prototype, "maxDate", void 0);
    __decorate([
        core_1.ViewChild('searchFilterToast'), 
        __metadata('design:type', Object)
    ], SearchFilters.prototype, "searchFilterToast", void 0);
    SearchFilters = __decorate([
        core_1.Component({
            //moduleId: module.id,
            selector: 'search-filters',
            templateUrl: 'app/shared/search-filter/searchfilter.component.html',
            styleUrls: ['app/shared/search-filter/searchfilter.component.css'],
            directives: [angular2_polymer_1.PolymerElement('vaadin-date-picker'), angular2_polymer_1.PolymerElement('paper-input'), angular2_polymer_1.PolymerElement('vaadin-combo-box'), angular2_polymer_1.PolymerElement('paper-toast')],
        }), 
        __metadata('design:paramtypes', [])
    ], SearchFilters);
    return SearchFilters;
}());
exports.SearchFilters = SearchFilters;
//# sourceMappingURL=searchfilter.component.js.map