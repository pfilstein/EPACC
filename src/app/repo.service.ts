import { Injectable } from '@angular/core';
import { Http , Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { IRepoSearchResponse, IRepo, ICommit } from './repo';

@Injectable()
export class RepoService {
  private _repoSearchUrl='https://api.github.com/search/repositories?q=';
  private _commitsUrlSuffix='/commits';

  constructor(private _http: Http){}

  searchRepos(auth: string, query: string): Observable<IRepo[]> {
    let headers: Headers = new Headers();
    if(auth) headers.append('Authorization', auth);
    headers.append('Accept', 'json');

    return this._http.get(this._repoSearchUrl + query, { headers: headers })
      .map((response: Response) => {
        let repos = <IRepo[]>(<IRepoSearchResponse> response.json()).items;
        repos.forEach((repo: IRepo) => this.getCommits(auth, repo).subscribe(commits => repo.commits = commits))
        return repos;
      });
  }

  getCommits(auth: string, repo: IRepo): Observable<ICommit[]> {
    let headers: Headers = new Headers();
    if (auth) headers.append('Authorization', auth);
    headers.append('Accept', 'json');

    return this._http.get(repo.url + this._commitsUrlSuffix, { headers: headers })
      .map((response: Response) => <ICommit[]> response.json())
      .catch((error: any) => {
        if(error.status != 409) {
          console.error(JSON.stringify(error));
          return Observable.throw(error);
        }
        else {
          console.log(JSON.stringify(error));
          return Observable.of(false);
        }
      });
  }


}
