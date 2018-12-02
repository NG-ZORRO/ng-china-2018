import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, from, forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, concatAll, filter } from 'rxjs/operators';

import { GithubService } from '../../../services/github.service';
import { FormService } from '../../../services/form.service';

const inputRE = /^([a-zA-Z0-9\-\_\s\,\/])+$/;

@Component({
  selector   : 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls  : [ './issue-form.component.less' ]
})
export class IssueFormComponent implements OnInit {

  advancedSearch = false;
  formGroup: FormGroup;
  stateOptions = [ 'open/closed', 'open', 'closed' ];
  labelOptions: github.LabelsItem[] = [];
  repoInput$ = new Subject<string>();
  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private gitHubService: GithubService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loading$ = this.gitHubService.loading$.asObservable();
    this.repoInput$.pipe(
      filter(() => this.advancedSearch),
      debounceTime(700),
      distinctUntilChanged(),
      mergeMap((repoString: string) => {
        return forkJoin(repoString
          .split(',')
          .map(i => i.trim())
          .map(i => this.gitHubService.searchLabels(i)));
      }),
    ).subscribe(
      (labelArrays: Array<github.LabelsItem[]>) => {
        this.labelOptions =
          labelArrays.length === 1
            ? labelArrays[ 0 ]
            : labelArrays.reduce((a, b) => [ ...a, ...b ]);
      }, () => {

      });
  }

  onSubmit(): void {
    const queryString = this.formService.parseParams(this.formGroup.value as github.IssueQueryParams, this.advancedSearch);
    this.gitHubService.query = queryString;
    this.gitHubService.searchIssues();
  }

  onToggleAdvanced(): void {
    this.advancedSearch = !this.advancedSearch;
  }

  onResetButtonClick(): void {
    this.formGroup.reset();
    this.formGroup.get('repo').setValue('ng-zorro/ng-zorro-antd');
    this.formGroup.get('state').setValue('open/closed');
    this.formGroup.get('label').setValue([]);
  }

  onRepoChange(input: string) {
    this.repoInput$.next(input);
  }

  disabledDate = (current: Date): boolean => {
    const today = new Date;
    today.setHours(23, 59, 59, 0);
    return current.getTime() >= today.getTime();
  };

  private createForm(): void {
    this.formGroup = this.fb.group({
      repo   : [ 'ng-zorro/ng-zorro-antd', [ Validators.required, Validators.pattern(inputRE) ] ],
      state  : [ 'open/closed' ],
      label  : [ '' ],
      updated: []
    });
  }

}
