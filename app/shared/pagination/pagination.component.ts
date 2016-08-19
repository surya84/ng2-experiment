import { Component, OnInit, Input } from '@angular/core';
import { PaginatePipe, PaginationControlsCmp, PaginationService, IPaginationInstance } from 'ng2-pagination';
import { PolymerElement } from '@vaadin/angular2-polymer';
@Component({
    selector: 'ap-pagination',
    templateUrl: './app/shared/pagination/pagination.component.html',
    styleUrls: ['./app/shared/pagination/pagination.component.css'],
    directives: [
        PolymerElement('paper-input'),
        PaginationControlsCmp
    ],
})
class PaginationComponent {
    @Input() pagingConfig: IPaginationInstance;
    constructor() {
        if (!this.pagingConfig) {
            this.pagingConfig = { itemsPerPage: 5, currentPage: 1 }
        }
    }
}

export {IPaginationInstance, PaginationComponent, PaginatePipe, PaginationService}