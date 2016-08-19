import { Component }  from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NewAssociateComponent } from './new.associate.component';
import { ProspectiveAssociateComponent } from './prospective.associate.component';
import { ListAssociatesComponent } from './list.associate.component';

@Component({
    // moduleId: module.id,
    selector: 'ap-associate',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})

class AssociateComponent { }

export { NewAssociateComponent, AssociateComponent, ProspectiveAssociateComponent, ListAssociatesComponent }