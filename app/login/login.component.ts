import { Component, OnInit, Inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Response } from '@angular/http';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { AuthenticationService } from '../services/authetication.service';
import { User } from '../models/index';
import { ConfigService } from '../config/config.service';
import 'rxjs/Rx';

@Component({
    // moduleId: module.id,
    selector: 'login-form',
    directives: [ROUTER_DIRECTIVES, NgIf],
    templateUrl: "app/login/login.component.html",
})
export class LoginComponent implements OnInit {
    private _login: User;

    email: string;
    password: string;
    loading: boolean = false;
    errorMessage: string;

    constructor( @Inject(Router) private _router: Router, @Inject(AuthenticationService) private _service: AuthenticationService,
        @Inject(ConfigService) private _configService: ConfigService) {
        this._login = new User();
    }

    login() {
        event.preventDefault();
        this.loading = true;
        this.errorMessage = "";
        this._service.login(this._login).then(() => {
            this.loading = false;
            this._router.navigate(['/ap/dashboard']);
        }).catch((res) => {
            this.loading = false;

            this.errorMessage = "We don't recognize this user ID or password"; //move this to resurces
        });
    }

    ngOnInit() {
        this._configService.load().then(() => console.log("Config was loaded"));
        this._configService.loadLookupConfig().then(() => console.log("Config was loaded"));
    }
}