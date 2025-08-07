import { Directive, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[vmsBlockCopyPast]',
})
export class BlockCopyPastDirective {

  constructor() { }

  @HostListener('paste', ['$event']) blockPaste(e: Event): void {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: Event): void {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: Event): void {
    e.preventDefault();
  }
}
