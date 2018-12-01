import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { GithubService } from '../../../services/github.service';
import { FormService } from '../../../services/form.service';

const inputRE = /^([a-zA-Z0-9\-\_\s\,\/])+$/;

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: [ './issue-form.component.less' ]
})
export class IssueFormComponent implements OnInit {

  advancedSearch = false;
  formGroup: FormGroup;
  stateOptions = [ 'open/close', 'open', 'close' ];

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private gitHubService: GithubService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loading$ = this.gitHubService.loading$.asObservable();
  }

  onSubmit(): void {
    const queryString = this.formService.parseParams(this.formGroup.value as github.IssueQueryParams, this.advancedSearch);
    console.log(queryString);
    this.gitHubService.query = queryString;
    this.gitHubService.searchIssues();
  }

  onToggleAdvanced(): void {
    this.advancedSearch = !this.advancedSearch;
  }

  onResetButtonClick(): void {
    this.formGroup.reset();
    this.formGroup.get('repository').setValue('ng-zorro');
    this.formGroup.get('state').setValue('open/close');
    this.formGroup.get('labels').setValue([]);
  }

  disabledDate = (current: Date): boolean => {
    const today = new Date;
    today.setHours(23, 59, 59, 0);
    return current.getTime() >= today.getTime();
  }

  private createForm(): void {
    this.formGroup = this.fb.group({
      repo: [ 'ng-zorro/ng-zorro-antd', [ Validators.required, Validators.pattern(inputRE) ] ],
      state: [ 'open/close' ],
      label: [ '' ],
      updated: []
    });
  }

}
