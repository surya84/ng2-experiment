import { Component, OnInit, ViewChild, Injector, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSwitch } from '@angular/common';
import { ResourceUrl, EmployeeType, Grade, User, Department, Technology, Designation, HRAdvisor } from '../../models/index';
import { ILookup } from '../../interfaces/ILookup';
import { IField } from '../../interfaces/IField';
import { DataStore, IDataStore } from '../datastore';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { SearchFilters, IFilter } from '../search-filter/searchfilter.component';
import { AppInjector } from '../../shared/injector';
import { ConfigService } from '../../config/config.service';
import { NgForm } from '@angular/common';
import { PaginationComponent, IPaginationInstance, PaginatePipe, PaginationService } from '../pagination/pagination.component';


declare var moment: any, Polymer: any, swal: any;
declare var accounting: any;
@Component({
    selector: 'ap-lookup',
    templateUrl: './app/shared/lookup/lookup.component.html',
    directives: [PaginationComponent, SearchFilters, NgSwitch,
        PolymerElement('vaadin-date-picker'),
        PolymerElement('paper-input'),
        PolymerElement('paper-textarea'),
        PolymerElement('paper-dialog'),
        PolymerElement('vaadin-combo-box'),
        PolymerElement('paper-checkbox'),
        PolymerElement('vaadin-grid'),
        PolymerElement('vaadin-upload')
    ],
    styleUrls: [`./app/shared/lookup/lookup.component.css`],
    pipes: [PaginatePipe],
    providers: [PaginationService]
})
export class LookupComponent implements OnInit {

    fields: Array<IField>;
    title: string;

    public pagingConfig: IPaginationInstance = {
        id: 'lookup-paging',
        itemsPerPage: 5,
        currentPage: 1
    };

    @ViewChild("grdList") grdList: any;

    filters: Array<IFilter>;

    private _service: IDataStore<any>;
    private _items: Array<any>;
    private _dataSource: Array<any>;
    private _config: ConfigService;
    private _isEditMode: boolean;
    private resources: { list: string; create: string, update: string, delete: string; };

    @ViewChild('messageToaster') messageToaster: any;
    @ViewChild('dialogEdit') dialogEdit: any;
    @ViewChild('lookupForm') lookupForm: any;
    @ViewChild('btnSubmit') btnSubmit: any;

    constructor(private actRoute: ActivatedRoute, private _injector: Injector = AppInjector(), private _router: Router) {
        this._config = _injector.get(ConfigService);
    }

    ngOnInit() {

        this._isEditMode = false;

        let lookupConfig = this._config.lookupConfig;
        if (!lookupConfig) {
            this._router.navigate(['/login']);
        }

        this.actRoute.params
            .subscribe(params => {
                this.filters = [];
                this.fields = [];

                let type = params['type'];

                if (!lookupConfig[type]) {
                    swal("No Configuration found!", "Lookup(" + type + ") wan not configured!", "error");
                    //throw new Error("Lookup(" + type + ") wan not configured!");
                }

                this.title = lookupConfig[type].title ? lookupConfig[type].title : "";

                lookupConfig[type].fields.forEach((element: any) => {
                    this.fields.push(element);
                    if (element.label != 'Id') {
                        this.filters.push({ displayName: element.label, name: element.name, type: element.type == "list" ? "string" : element.type });
                    }
                });

                this.resources = lookupConfig[type].resources;
                this._service = new DataStore<any>(this.resources);

                this.getData();
                this.fillDropDowns();
            });
    }

    ngAfterViewInit() {
        this.grdList.nativeElement.then(() => {
            this.onGridReady(this.grdList.nativeElement);
        });
    }

    private getData() {
        this._items = this._dataSource = [];
        let source: any = [];
        this._service.list().subscribe((res) => {
            let _dataItem: any;

            source = res.map((item) => {
                _dataItem = {};
                this.fields.forEach((field: any) => {
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
            this._items = this._dataSource = source;
            console.log(source);

        });
    }

    private fillDropDowns() {
        this.fields.forEach(element => {
            if (element.type == 'list') {
                (new DataStore<any>({ list: element.resources.list.url }).list().subscribe((res) => {
                    console.log(res);

                    let items: any[] = [];
                    res.forEach((item) => {
                        if (item[element.resources.list.key]) {
                            items.push({ key: item[element.resources.list.key], value: item[element.resources.list.value] });
                        }
                    });

                    element.resources.items = items;
                }));
            }
        });
    }

    keys(item: {}): Array<string> {
        return Object.keys(item);

        // .filter((col) => {
        //     return col != "ID";
        // });
    }

    onSortOrderChanged(e: any) {
        debugger;
    }

    onSelectionChanged() {
        var selection = this.grdList.nativeElement.selection;
        if (selection != null) {
            let index = selection.selected()[0];
            if (index != undefined) {
                var selectedItem = this._dataSource[index];

                this.fields.forEach(field => {
                    field.value = selectedItem[field.name];
                    if (field.value === undefined && field.name.toLowerCase().indexOf('id') > -1) {
                        var idKey = Object.keys(selectedItem).find((x) => {
                            return x.toLowerCase().indexOf('id') > -1
                        });
                        field.value = selectedItem[idKey];
                    }
                });

                this.onEdit();
            }
        }
    }

    onFiltersChanged(selectedFilter: IFilter) {
        if (selectedFilter.name == "") {
            this._dataSource = this._items;
            this.grdList.nativeElement.refreshItems();
            return;
        }

        this._dataSource = this._items.filter((item) => {
            if (selectedFilter.type == 'boolean') {
                return item[selectedFilter.name] == selectedFilter.value.is;
            } else if (selectedFilter.type == 'string') {
                return item[selectedFilter.name] && item[selectedFilter.name].indexOf(selectedFilter.value.contains) > -1;
            } else if (selectedFilter.type == 'date') {

                if (item[selectedFilter.name]) {
                    let minDate = selectedFilter.value.min;
                    let maxDate = selectedFilter.value.max;

                    return moment(item[selectedFilter.name]).isBetween(moment(minDate), moment(maxDate));
                }

                return false;
            } else {
                return false;
            }
        });

        this.grdList.nativeElement.refreshItems();
    }

    onAdd() {
        this.fields.forEach(field => {
            field.value = "";
        });

        this.dialogEdit.nativeElement.open();
        this._isEditMode = false;
    }

    onEdit() {
        this.dialogEdit.nativeElement.open();
        this._isEditMode = true;
    }

    onCancel() {
        this.dialogEdit.nativeElement.toggle();
    }

    onSaveorUpdate(event: Event) {
        let obj = {};
        let errorCount = 0;
        this.fields.forEach(field => {
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
            this._service.update(obj).subscribe((response) => {
                if (response) {
                    return this.onDataSaved();
                }
            }, (error) => {
                swal("Update failed!", error, "error");
            });
        } else {
            this._service.create(obj).subscribe((response) => {
                if (response) {
                    return this.onDataSaved();
                }
            }, (error) => {
                swal("Create failed!", error, "error");
            });
        }

        return false;
    }

    onDataSaved() {
        this.getData();
        this.dialogEdit.nativeElement.toggle();

        this.messageToaster.nativeElement.text = "Sucessfully saved.";
        this.messageToaster.nativeElement.open();

        return false;
    }

    onGridReady(grid: any) {
        // grid.items = (params: any, callback) =>
        //     this._service.list().subscribe((res) => { this._items = res; callback(res, res.length); });

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

        grid.addEventListener('sort-order-changed', (e: any) => {
            let sortBy = grid.columns[e.detail.value[0].column].name;
            let sortOrder = { sortBy: sortBy, direction: e.detail.value[0].direction };

            // sort order is fired for the first time before grid has been initialized properly,
            // so scrolling will crash.
            try {
                this.onSortOrderChanged(e);
            } catch (err) {

            }
        });
    }

}