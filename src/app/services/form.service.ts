import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

export type IssueStates = 'open/closed' | 'open' | 'closed';

const spaceRE = /\s/;

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private datePipe: DatePipe) { }

  parseParams(form: github.IssueQueryParams, advanced: boolean): string {
    if (!advanced) {
      return this.parseString(form.repo, 'repo');
    } else {
      const repo = this.parseString(form.repo, 'repo');
      const state = this.parseState(form.state);
      const updated = this.parseTimeToDate(form.updated);
      const label = this.parseString(form.label, 'label');
      return [ repo, label, state, updated ].filter(i => i !== '').join(' ');
    }
  }

  private parseString(str: string, prefix: string): string {
    return str
      ? str
        .split(',')
        .map(i => i.trim())
        .filter(i => !!i)
        .map(i => {
          const hasSpace = spaceRE.test(i);
          return hasSpace ? `${prefix}:"${i}"` : `${prefix}:${i}`;
        })
        .join(' ')
      : '';
  }

  private parseTimeToDate(date: Date): string {
    return date ? `updated:${this.datePipe.transform(date, 'yyyy-MM-dd')}` : '';
  }

  private parseState(state: IssueStates): string {
    return state === 'open/closed' ? '' : `state:${state}`;
  }
}
