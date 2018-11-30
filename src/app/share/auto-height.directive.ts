import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Directive, HostListener, Inject, Input, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NzTableComponent } from 'ng-zorro-antd';

@Directive({
  selector: 'nz-table[autoHeight]'
})
export class AutoHeightDirective implements OnInit, AfterViewInit, OnDestroy {

  @Input() offsetY = 120;
  resize$ = new Subject<void>();

  constructor(@Inject(DOCUMENT) private document: any, private hostTable: NzTableComponent, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.resize$.pipe(debounceTime(300))
    .subscribe(() => {
      this.updateHeight();
    });
  }

  ngAfterViewInit(): void {
    this.updateHeight();
  }

  ngOnDestroy(): void {
    this.resize$.complete();
    this.resize$ = null;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resize$.next();
  }

  updateHeight(): void {
    const hostEle = this.hostTable.el;
    const rectInfo = hostEle.getBoundingClientRect();
    if (this.document) {
      const y = `${(this.document as Document).documentElement.offsetHeight - rectInfo.top - this.offsetY}px`;
      this.hostTable.nzScroll = Object.assign(this.hostTable.nzScroll, { y });
      this.cdr.detectChanges();
    }
  }

}
