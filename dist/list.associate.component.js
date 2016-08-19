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
var angular2_polymer_1 = require('@vaadin/angular2-polymer');
var router_1 = require('@angular/router');
var searchfilter_component_1 = require('./shared/search-filter/searchfilter.component');
var datastore_1 = require('./shared/datastore');
var config_service_1 = require('./config/config.service');
var injector_1 = require('./shared/injector');
var ListAssociatesComponent = (function () {
    function ListAssociatesComponent(_injector, _router) {
        if (_injector === void 0) { _injector = injector_1.AppInjector(); }
        this._injector = _injector;
        this._router = _router;
        var _configService = _injector.get(config_service_1.ConfigService);
        this._resources = _configService.get('API').Associate;
        this._dataService = new datastore_1.DataStore(this._resources);
    }
    ListAssociatesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.grdAssociates.nativeElement.then(function () {
            _this.onGridReady(_this.grdAssociates.nativeElement);
        });
    };
    ListAssociatesComponent.prototype.onFiltersChanged = function (event) {
    };
    ListAssociatesComponent.prototype.onSelectionChanged = function (event) {
        // debugger;
        var selection = this.grdAssociates.nativeElement.selection;
        if (selection != null) {
            var index = selection.selected()[0];
            if (index) {
                this._router.navigate(["ap/associates/edit/174"]);
            }
        }
    };
    ListAssociatesComponent.prototype.onGridReady = function (grid) {
        var _this = this;
        grid.items = function (params, callback) {
            return _this._dataService.list().subscribe(function (res) {
                _this._associates = res;
                console.log(res);
                callback(res, res.length);
            });
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
    };
    __decorate([
        core_1.ViewChild('grdAssociates'), 
        __metadata('design:type', Object)
    ], ListAssociatesComponent.prototype, "grdAssociates", void 0);
    ListAssociatesComponent = __decorate([
        core_1.Component({
            // moduleId: module.id
            selector: 'list-associates',
            templateUrl: './app/list.associate.component.html',
            directives: [searchfilter_component_1.SearchFilters, angular2_polymer_1.PolymerElement('vaadin-grid')],
        }),
        __param(1, core_1.Inject(router_1.Router)), 
        __metadata('design:paramtypes', [core_1.Injector, router_1.Router])
    ], ListAssociatesComponent);
    return ListAssociatesComponent;
}());
exports.ListAssociatesComponent = ListAssociatesComponent;
//# sourceMappingURL=list.associate.component.js.map