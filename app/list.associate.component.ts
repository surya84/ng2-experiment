import { Component, Inject, Injector, ViewChild } from '@angular/core';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { Router } from '@angular/router';

import { SearchFilters, IFilter } from './shared/search-filter/searchfilter.component';
import { DataStore, IDataStore } from './shared/datastore';
import { Associate } from './models';
import { ConfigService } from './config/config.service';
import { AppInjector } from './shared/injector';

@Component({
    // moduleId: module.id
    selector: 'list-associates',
    templateUrl: './app/list.associate.component.html',
    directives: [SearchFilters, PolymerElement('vaadin-grid')],
})
export class ListAssociatesComponent {
    filters: ["Name", "Mobile", "EmployeeCode"];
    _resources: any;
    _dataService: IDataStore<Associate>;
    _associates: any[];

    @ViewChild('grdAssociates') grdAssociates: any;

    constructor(private _injector: Injector = AppInjector(), @Inject(Router) private _router: Router) {
        let _configService = _injector.get(ConfigService);
        this._resources = _configService.get('API').Associate;

        this._dataService = new DataStore<Associate>(this._resources);
    }

    ngAfterViewInit() {
        this.grdAssociates.nativeElement.then(() => {
            this.onGridReady(this.grdAssociates.nativeElement);
        });
    }

    onFiltersChanged(event: any) {

    }

    onSelectionChanged(event: Event) {
        // debugger;
        var selection = this.grdAssociates.nativeElement.selection;
        if (selection != null) {
            let index = selection.selected()[0];

            if (index) {
                this._router.navigate(["ap/associates/edit/174"]);
            }
        }


    }

    onGridReady(grid: any) {
        grid.items = (params: any, callback: any) =>
            this._dataService.list().subscribe((res: any) => {
                this._associates = res;
                console.log(res);
                callback(res, res.length);
            });

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



    }
}