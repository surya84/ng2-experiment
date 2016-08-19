import { provideRouter, RouterConfig } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { MasterLayoutComponent } from '../shared/shell/_layout.component';
import { LAYOUT_ROUTER_PROVIDERS } from './_layout.routes';
import { DashboardComponent } from '../dashboard.component';
import { AssociateComponent } from '../associate.component';

import { NewAssociateComponent } from '../new.associate.component';
import { ProspectiveAssociateComponent } from '../prospective.associate.component';
import { ListAssociatesComponent } from '../list.associate.component';
import { EditAssociateComponent } from '../edit.associate.component';
import { AdminComponent } from '../admin.component';

import { LookupComponent } from '../shared/lookup/lookup.component';

export const routes: RouterConfig = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'ap', component: MasterLayoutComponent,
        children: [
            {
                path: '*', component: DashboardComponent
            },
            { path: 'dashboard', component: DashboardComponent },
            {
                path: 'associates', component: AssociateComponent,
                children: [
                    { path: '', component: ListAssociatesComponent },
                    { path: 'new', component: NewAssociateComponent },
                    { path: 'prospective-associates', component: ProspectiveAssociateComponent },
                    { path: 'list', component: ListAssociatesComponent },
                    { path: 'edit/:id', component: EditAssociateComponent }
                ]
            },
            {
                path: 'admin', component: AdminComponent, pathMatch: 'prefix',
                children: [
                    {
                        path: 'lookup/:type', component: LookupComponent, pathMatch: 'full',
                    }
                ]
            }

        ]
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];