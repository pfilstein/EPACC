import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from './alert.service';
import { LoginService } from './login.service';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  userId: string;
  password: string;
  waiting = false;
  returnUrl: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService,
    private _alertService: AlertService) { }

  ngOnInit() {
    this._loginService.logout();
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  Login(): void {
    this.waiting = true;
    this._loginService.login(this.userId, this.password)
      .subscribe(
        () => {
          this._router.navigate([this.returnUrl]);
        },
        error => {
          this._alertService.error(error);
          this.waiting = false;
        });
  }
}
