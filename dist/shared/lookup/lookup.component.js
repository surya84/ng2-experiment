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
var common_1 = require('@angular/common');
var datastore_1 = require('../datastore');
var angular2_polymer_1 = require('@vaadin/angular2-polymer');
var searchfilter_component_1 = require('../search-filter/searchfilter.component');
var injector_1 = require('../../shared/injector');
var config_service_1 = require('../../config/config.service');
var ng2_pagination_1 = require('ng2-pagination');
var LookupComponent = (function () {
    function LookupComponent(actRoute, _injector, _router) {
        if (_injector === void 0) { _injector = injector_1.AppInjector(); }
        this.actRoute = actRoute;
        this._injector = _injector;
        this._router = _router;
        this.pagingConfig = {
            id: 'lookup-paging',
            itemsPerPage: 10,
            currentPage: 1
        };
        this._config = _injector.get(config_service_1.ConfigService);
    }
    LookupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._isEditMode = false;
        var lookupConfig = this._config.lookupConfig;
        if (!lookupConfig) {
            this._router.navigate(['/login']);
        }
        this.actRoute.params
            .subscribe(function (params) {
            _this.filters = [];
            _this.fields = [];
            var type = params['type'];
            if (!lookupConfig[type]) {
                swal("No Configuration found!", "Lookup(" + type + ") wan not configured!", "error");
            }
            _this.title = lookupConfig[type].title ? lookupConfig[type].title : "";
            lookupConfig[type].fields.forEach(function (element) {
                _this.fields.push(element);
                if (element.label != 'Id') {
                    _this.filters.push({ displayName: element.label, name: element.name, type: element.type == "list" ? "string" : element.type });
                }
            });
            _this.resources = lookupConfig[type].resources;
            _this._service = new datastore_1.DataStore(_this.resources);
            _this.getData();
            _this.fillDropDowns();
        });
    };
    LookupComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.grdList.nativeElement.then(function () {
            _this.onGridReady(_this.grdList.nativeElement);
        });
    };
    LookupComponent.prototype.getData = function () {
        var _this = this;
        this._items = this._dataSource = [];
        var source = [];
        this._service.list().subscribe(function (res) {
            var _dataItem;
            source = res.map(function (item) {
                _dataItem = {};
                _this.fields.forEach(function (field) {
                    _dataItem[field.name] = item[field.name];
                });
                return _dataItem;
            });
            // res.forEach((item) => {
            //     var _dataItem: any = {};
            //     this.fields.forEach((field) => {
            //         _dataItem[field] = item[field];
            //     });
            //     source.push(_dataItem);
            // });
            _this._items = _this._dataSource = source;
            console.log(source);
        });
    };
    LookupComponent.prototype.fillDropDowns = function () {
        this.fields.forEach(function (element) {
            if (element.type == 'list') {
                (new datastore_1.DataStore({ list: element.resources.list.url }).list().subscribe(function (res) {
                    console.log(res);
                    var items = [];
                    res.forEach(function (item) {
                        if (item[element.resources.list.key]) {
                            items.push({ key: item[element.resources.list.key], value: item[element.resources.list.value] });
                        }
                    });
                    element.resources.items = items;
                }));
            }
        });
    };
    LookupComponent.prototype.keys = function (item) {
        return Object.keys(item);
        // .filter((col) => {
        //     return col != "ID";
        // });
    };
    LookupComponent.prototype.onSortOrderChanged = function (e) {
        debugger;
    };
    LookupComponent.prototype.onSelectionChanged = function () {
        var selection = this.grdList.nativeElement.selection;
        if (selection != null) {
            var index = selection.selected()[0];
            if (index != undefined) {
                var selectedItem = this._dataSource[index];
                this.fields.forEach(function (field) {
                    field.value = selectedItem[field.name];
                    if (field.value === undefined && field.name.toLowerCase().indexOf('id') > -1) {
                        var idKey = Object.keys(selectedItem).find(function (x) {
                            return x.toLowerCase().indexOf('id') > -1;
                        });
                        field.value = selectedItem[idKey];
                    }
                });
                this.onEdit();
            }
        }
    };
    LookupComponent.prototype.onFiltersChanged = function (selectedFilter) {
        if (selectedFilter.name == "") {
            this._dataSource = this._items;
            this.grdList.nativeElement.refreshItems();
            return;
        }
        this._dataSource = this._items.filter(function (item) {
            if (selectedFilter.type == 'boolean') {
                return item[selectedFilter.name] == selectedFilter.value.is;
            }
            else if (selectedFilter.type == 'string') {
                return item[selectedFilter.name] && item[selectedFilter.name].indexOf(selectedFilter.value.contains) > -1;
            }
            else if (selectedFilter.type == 'date') {
                if (item[selectedFilter.name]) {
                    var minDate = selectedFilter.value.min;
                    var maxDate = selectedFilter.value.max;
                    return moment(item[selectedFilter.name]).isBetween(moment(minDate), moment(maxDate));
                }
                return false;
            }
            else {
                return false;
            }
        });
        this.grdList.nativeElement.refreshItems();
    };
    LookupComponent.prototype.onAdd = function () {
        this.fields.forEach(function (field) {
            field.value = "";
        });
        this.dialogEdit.nativeElement.open();
        this._isEditMode = false;
    };
    LookupComponent.prototype.onEdit = function () {
        this.dialogEdit.nativeElement.open();
        this._isEditMode = true;
    };
    LookupComponent.prototype.onCancel = function () {
        this.dialogEdit.nativeElement.toggle();
    };
    LookupComponent.prototype.onSaveorUpdate = function (event) {
        var _this = this;
        var obj = {};
        var errorCount = 0;
        this.fields.forEach(function (field) {
            if (field.isRequired && !field.value) {
                errorCount++;
            }
            if (!field.value && field.type == 'boolean') {
                field.value = false;
            }
            obj[field.name] = field.value;
        });
        if (errorCount) {
            this.btnSubmit.nativeElement.click();
            return false;
        }
        if (this._isEditMode) {
            this._service.update(obj).subscribe(function (response) {
                if (response) {
                    return _this.onDataSaved();
                }
            }, function (error) {
                swal("Update failed!", error, "error");
            });
        }
        else {
            this._service.create(obj).subscribe(function (response) {
                if (response) {
                    return _this.onDataSaved();
                }
            }, function (error) {
                swal("Create failed!", error, "error");
            });
        }
        return false;
    };
    LookupComponent.prototype.onDataSaved = function () {
        this.getData();
        this.dialogEdit.nativeElement.toggle();
        this.messageToaster.nativeElement.text = "Sucessfully saved.";
        this.messageToaster.nativeElement.open();
        return false;
    };
    LookupComponent.prototype.onGridReady = function (grid) {
        // grid.items = (params: any, callback) =>
        //     this._service.list().subscribe((res) => { this._items = res; callback(res, res.length); });
        var _this = this;
        //var detailsOpenIndex = -1;
        // grid.addEventListener('selected-items-changed', function () {
        //     debugger;
        //     grid.setRowDetailsVisible(detailsOpenIndex, false);
        //     let selected = grid.selection.selected();
        //     if (selected.length == 1) {
        //         grid.setRowDetailsVisible(selected[0], true);
        //         detailsOpenIndex = selected[0];
        //     }
        // });
        // // Add a row details generator
        // grid.rowDetailsGenerator = function (rowIndex) {
        //     let elem = document.createElement('div');
        //     elem.setAttribute('class', 'detailswrapper');
        //     grid.getItem(rowIndex, function (error, item) {
        //         if (!error) {
        //             // elem.innerHTML = document.getElementById("inputarea").innerHTML;
        //         }
        //     });
        //     return elem;
        // };
        grid.addEventListener('sort-order-changed', function (e) {
            var sortBy = grid.columns[e.detail.value[0].column].name;
            var sortOrder = { sortBy: sortBy, direction: e.detail.value[0].direction };
            // sort order is fired for the first time before grid has been initialized properly,
            // so scrolling will crash.
            try {
                _this.onSortOrderChanged(e);
            }
            catch (err) {
            }
        });
    };
    __decorate([
        core_1.ViewChild("grdList"), 
        __metadata('design:type', Object)
    ], LookupComponent.prototype, "grdList", void 0);
    __decorate([
        core_1.ViewChild('messageToaster'), 
        __metadata('design:type', Object)
    ], LookupComponent.prototype, "messageToaster", void 0);
    __decorate([
        core_1.ViewChild('dialogEdit'), 
        __metadata('design:type', Object)
    ], LookupComponent.prototype, "dialogEdit", void 0);
    __decorate([
        core_1.ViewChild('lookupForm'), 
        __metadata('design:type', Object)
    ], LookupComponent.prototype, "lookupForm", void 0);
    __decorate([
        core_1.ViewChild('btnSubmit'), 
        __metadata('design:type', Object)
    ], LookupComponent.prototype, "btnSubmit", void 0);
    LookupComponent = __decorate([
        core_1.Component({
            selector: 'ap-lookup',
            templateUrl: './app/shared/lookup/lookup.component.html',
            directives: [searchfilter_component_1.SearchFilters, common_1.NgSwitch,
                angular2_polymer_1.PolymerElement('vaadin-date-picker'),
                angular2_polymer_1.PolymerElement('paper-input'),
                angular2_polymer_1.PolymerElement('paper-textarea'),
                angular2_polymer_1.PolymerElement('paper-dialog'),
                angular2_polymer_1.PolymerElement('vaadin-combo-box'),
                angular2_polymer_1.PolymerElement('paper-checkbox'),
                angular2_polymer_1.PolymerElement('vaadin-grid'),
                angular2_polymer_1.PolymerElement('vaadin-upload'),
                ng2_pagination_1.PaginationControlsCmp
            ],
            pipes: [ng2_pagination_1.PaginatePipe],
            providers: [ng2_pagination_1.PaginationService],
            styleUrls: ["./app/shared/lookup/lookup.component.css"]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, core_1.Injector, router_1.Router])
    ], LookupComponent);
    return LookupComponent;
}());
exports.LookupComponent = LookupComponent;
//# sourceMappingURL=lookup.component.js.map