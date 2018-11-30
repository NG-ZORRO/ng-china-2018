import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  API_URL = 'https://api.github.com/search/issues';
  readonly issues$ = new Subject<github.Search>();
  readonly loading$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  searchIssues(page = 1, pageSize = 20) {
    this.loading$.next(true);
    this.http.get<github.Search>(`${this.API_URL}?q=repo%3Ang-zorro/ng-zorro-antd&page=${page}&per_page=${pageSize}`)
    .subscribe(data => {
      this.issues$.next(data);
      this.loading$.next(false);
    });
  }

}
