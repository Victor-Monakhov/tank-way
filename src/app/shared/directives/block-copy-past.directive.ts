import {Directive, HostListener} from '@angular/core';

@Directive({
    selector: '[blockCopyPast]',
    standalone: false
})
export class BlockCopyPastDirective {

  constructor() { }

  @HostListener('paste', ['$event']) blockPaste(e: Event) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: Event) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: Event) {
    e.preventDefault();
  }
}
