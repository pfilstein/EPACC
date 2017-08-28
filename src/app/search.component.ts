import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RepoService } from './repo.service';
import { IRepo } from './repo';
import { AlertService } from './alert.service';

@Component({
  templateUrl: './search.component.html',
})

export class SearchComponent  {
  searchQuery: string = '';
  isSearchPrivates: boolean = (localStorage.getItem('isSearchPrivates') === 'Y');
  waiting: boolean = false;

  repos: IRepo[];
  auth: string = localStorage.getItem('auth');
  msg: string;

  constructor(private router: Router, private _repoSrvc: RepoService, private _alertSrvc: AlertService) {}

  Search(): void {
    this.waiting = true;

    this._repoSrvc.searchRepos(this.auth, this.searchQuery)
      .subscribe(
        repos => {
        this.repos = repos;
        this.waiting = false;
        this.msg = JSON.stringify(this.repos);
      },
        error => {
        this._alertSrvc.error(error);
        this.waiting = false;
      });
  }

  PrivatesOptionChanged(): void {
    if(!this.isSearchPrivates) {
      localStorage.setItem('isSearchPrivates', 'Y');
      if(!this.auth)
        this.router.navigate(['/login']);
    }
    else {
      localStorage.removeItem('isSearchPrivates');
    }
  }
}
