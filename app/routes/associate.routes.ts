import { provideRouter, RouterConfig } from '@angular/router';

import { NewAssociateComponent } from '../new.associate.component';
import { ProspectiveAssociateComponent } from '../prospective.associate.component';
import { ListAssociatesComponent } from '../list.associate.component';
import { EditAssociateComponent } from '../edit.associate.component';

export const ASSOCIATE_ROUTER_PROVIDERS: RouterConfig = [
    { path: '', component: ListAssociatesComponent },
    { path: 'new', component: NewAssociateComponent },
    { path: 'prospective-associates', component: ProspectiveAssociateComponent },
    { path: 'list', component: ListAssociatesComponent },
    { path: 'edit/:id', component: EditAssociateComponent }
];