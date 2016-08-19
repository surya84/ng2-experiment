import { Component, OnInit, Injector, ViewChild, Inject } from '@angular/core';
import { Http } from '@angular/http';

//import { DataStore, IDataStore } from '../../implementations/datastore';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { Associate } from './models/associate.model';
//import { ConfigService } from '../config/config.service';
import * as moment from 'moment';
import { AssociateService } from './services/associate.service';
import { SearchFilters, IFilter } from './shared/search-filter/searchfilter.component';
// import { LookupComponent } from '../shared/lookup/lookup.component';
declare var Polymer: any;

@Component({
    selector: 'prospective-associate',
    directives: [SearchFilters, PolymerElement('vaadin-grid'), PolymerElement('iron-icon')],
    templateUrl: './app/prospective.associate.component.html',
    providers:[AssociateService]
})
export class ProspectiveAssociateComponent  {

    @ViewChild('grdPAssociates') grdPAssociates: any;
    private grdPAssociatesColumns: IFilter[];

    //private _service: any;
    _prosAssociates: Associate[];

    constructor( @Inject(Http) private _http: Http, @Inject(AssociateService) private _service: AssociateService) {
        let configData = JSON.parse(sessionStorage["AsscoiatePortal_Configuration"]);
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

    ngAfterViewInit() {
        this.grdPAssociates.nativeElement.then(() => {
            this.onGridReady(this.grdPAssociates.nativeElement);
        });
    }

    private selected(grid: any) {
        var selection = grid.selection.selected();
        if (selection.length === 1) {
            grid.selection.clear();
            grid.getItem(selection[0], (err: any, item: any) => {
                //            console.log(item);
            });
        }
    }

    private onFiltersChanged(filter: any) {
        console.log(filter);

        if (Polymer && Polymer.isInstance(this.grdPAssociates)) {
            this.grdPAssociates.scrollToStart(0);
        }

        console.log(this._prosAssociates);
        var filtereddata = this._prosAssociates.filter((data) => {
            if (filter.type == 'string') {
                return data[filter.name] && data[filter.name].search(new RegExp(filter.value.contains, "i")) > -1;
            } else if (filter.type == 'date') {
                if (data[filter.name]) {
                    let minDate = filter.value.min;
                    let maxDate = filter.value.max;

                    return moment(data[filter.name]).isBetween(moment(minDate), moment(maxDate));
                } else {
                    return false;
                }
            }
        });

        this.grdPAssociates.nativeElement.items = filtereddata;
        this.grdPAssociates.nativeElement.refreshItems();
    }

    onGridReady(grid: any) {
        grid.items = (params: any, callback: any) =>
            this._service.list().subscribe((res: any) => { this._prosAssociates = res; callback(res, res.length); });


        grid.cellClassGenerator = (cell: any) => {
            // if (cell.columnName === 'status') {
            //     return 'status-' + cell.data.replace(/ /g, '-').toLowerCase();
            // }
        };

        grid.addEventListener('sort-order-changed', (e: any) => {
            var sortBy = grid.columns[e.detail.value[0].column].name;
            // this.sortOrder = { sortBy: sortBy, direction: e.detail.value[0].direction };

            // sort order is fired for the first time before grid has been initialized properly,
            // so scrolling will crash.
            try {
                grid.scrollToStart(0);
                //grid.refreshItems();
            } catch (err) {

            }
        });

        // grid.columns[5].renderer = (cell) => {
        //     // if (cell.data) {
        //     //     cell.element.innerHTML = moment(cell.data).format('YYYY-MM-DD');
        //     // } else {
        //     //     cell.element.innerHTML = "";
        //     // }
        // };

        grid.columns[8].renderer = (cell: any) => {
            // cell.element.innerHTML = "<i class='deleteIcon fa fa-times' aria-hidden='true' on-click='deletePAsscociate(" + cell.row.index + ")'></i>";
            //cell.element.innerHTML = "<a onclick='deletePAssociate(" + cell.row.index + ")'><paper-icon-button icon='delete'></paper-icon-button>Delete</a>";
            //cell.element.innerHTML = " <button (click)='deletePAssociate(" + cell.row.index + ")'>Delete</button>";
        };
    }
}
