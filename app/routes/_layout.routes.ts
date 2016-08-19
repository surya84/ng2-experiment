import { RouterConfig } from '@angular/router';

import { DashboardComponent } from '../dashboard.component';
import { AssociateComponent } from '../associate.component';

import { ASSOCIATE_ROUTER_PROVIDERS } from './associate.routes';

export const LAYOUT_ROUTER_PROVIDERS: RouterConfig = [
    { path: '*', component: DashboardComponent },
    { path: '/dashboard', component: DashboardComponent },
    { path: '/associates', component: AssociateComponent, children: ASSOCIATE_ROUTER_PROVIDERS }
];