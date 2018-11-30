import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubService } from '../../../services/github.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 20;
  dataSet$: Observable<github.Search>;
  loading$: Observable<boolean>;

  constructor( private githubService: GithubService) {
  }

  ngOnInit(): void {
    this.dataSet$ = this.githubService.issues$;
    this.loading$ = this.githubService.loading$;
    this.loadData();
  }

  loadData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.githubService.searchIssues(this.pageIndex, this.pageSize);
  }
}
