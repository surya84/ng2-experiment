import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Associate } from './models/index';

@Component({
    //moduleId: module.id,
    selector: 'edit-associate',
    templateUrl: './app/edit.associate.component.html',
    styleUrls: [`./app/edit.associate.component.css`]
})
export class EditAssociateComponent implements OnInit {
    id: Number = 0;
    newAssociate: Associate;
    @ViewChild("assocaiteForm") assocaiteForm: any;
    constructor(private actRoute: ActivatedRoute) {
        this.newAssociate = new Associate();

        this.actRoute.params
            .subscribe(params => {
                this.id = params['id'];
            });
    }

    ngOnInit() {
        this.newAssociate.firstName = "Surya!";
    }

    onUpdate() {

    }
}