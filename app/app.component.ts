import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MasterLayoutComponent } from './shared/shell/_layout.component';
import { LoginComponent } from './login/login.component';
@Component({
    selector: 'associate-portal',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {

}
