import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NzThComponent } from 'ng-zorro-antd';

@Directive({
  selector: 'th[nzThResize]'
})
export class ThResizeDirective implements AfterViewInit {

  handleEle: HTMLSpanElement;
  private mousedoun = false;

  constructor(private elementRef: ElementRef, private render: Renderer2, private thComponent: NzThComponent) {
  }

  ngAfterViewInit(): void {
    this.setHandle();
  }

  @HostListener('mousedown', ['$event'])
  onmousedown($event: MouseEvent) {
    this.mousedoun = $event.target === this.handleEle;
  }

  @HostListener('document:mousemove', ['$event'])
  onmousemove($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.mousedoun) {
      const hostEle = this.elementRef.nativeElement as HTMLTableHeaderCellElement;
      const rectInfo = hostEle.getBoundingClientRect();
      const width = $event.screenX - rectInfo.left;
      this.thComponent.nzWidth = `${width}px`;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onmouseup($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.mousedoun = false;
  }

  setHandle() {
    const hostEle = this.elementRef.nativeElement as HTMLTableHeaderCellElement;
    this.render.setStyle(hostEle, 'position', 'relative');
    this.handleEle = this.render.createElement('span');
    this.render.setAttribute(this.handleEle, 'style', `
      position: absolute;
      width: 1px;
      height: 60%;
      top: 20%;
      right: 0;
      border-left: 1px solid #d7d7d7;
      cursor: ew-resize;
      padding: 3px;`
    );
    this.render.appendChild(hostEle, this.handleEle);
  }

}
