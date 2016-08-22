import { provideRouter, RouterConfig } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { MasterLayoutComponent } from '../shared/shell/_layout.component';
import { LAYOUT_ROUTER_PROVIDERS } from './_layout.routes';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AssociateComponent } from '../components/associate/associate.component';

import { NewAssociateComponent } from '../components/associate/new.associate.component';
import { ProspectiveAssociateComponent } from '../components/associate/prospective.associate.component';
import { ListAssociatesComponent } from '../components/associate/list.associate.component';
import { EditAssociateComponent } from '../components/associate/edit.associate.component';
import { AdminComponent } from '../components/admin/admin.component';

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