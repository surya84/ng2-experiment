import { Component, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { IFilter } from '../../interfaces/IFilter';
import * as moment from 'moment';

@Component({
  //moduleId: module.id,
  selector: 'search-filters',
  templateUrl: 'app/shared/search-filter/searchfilter.component.html',
  styleUrls: ['app/shared/search-filter/searchfilter.component.css'],
  directives: [PolymerElement('vaadin-date-picker'), PolymerElement('paper-input'), PolymerElement('vaadin-combo-box'), PolymerElement('paper-toast')],
})

class SearchFilters {
  @Input() columns: IFilter[];
  @Output() filtersChange = new EventEmitter();
  @ViewChild('minDate') minDate: any;
  @ViewChild('maxDate') maxDate: any;

  @ViewChild('searchFilterToast') searchFilterToast: any;

  selectedFilterColumn: IFilter;

  constructor() {
    this.selectedFilterColumn = { name: "", displayName: "", type: "", value: { contains: "" } };
  }

  ngAfterViewInit() {
    this.minDate.nativeElement.i18n.formatDate = function (d: any) {
      return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/');
    }

    this.maxDate.nativeElement.i18n.formatDate = function (d: any) {
      return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/');
    }

  }

  activeFilterCount: number = 0;

  private filtersChanged(event: any) {
    let changedValue = event.detail.value;

    if (changedValue) {
      changedValue.value = { contains: "" };
    }

    this.selectedFilterColumn = changedValue;

    if (!this.selectedFilterColumn) {
      this.selectedFilterColumn = { name: "", displayName: "", type: "", value: { contains: "" } };
    }
  }

  private onSearch() {
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
  }

  private onClear() {
    this.selectedFilterColumn = { name: "", displayName: "", type: "", value: { contains: "" } };
    this.filtersChange.emit(this.selectedFilterColumn);
  }
}

export { IFilter, SearchFilters }