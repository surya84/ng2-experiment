import { provideRouter, RouterConfig } from '@angular/router';

import { NewAssociateComponent } from '../components/associate/new.associate.component';
import { ProspectiveAssociateComponent } from '../components/associate/prospective.associate.component';
import { ListAssociatesComponent } from '../components/associate/list.associate.component';
import { EditAssociateComponent } from '../components/associate/edit.associate.component';

export const ASSOCIATE_ROUTER_PROVIDERS: RouterConfig = [
    { path: '', component: ListAssociatesComponent },
    { path: 'new', component: NewAssociateComponent },
    { path: 'prospective-associates', component: ProspectiveAssociateComponent },
    { path: 'list', component: ListAssociatesComponent },
    { path: 'edit/:id', component: EditAssociateComponent }
];