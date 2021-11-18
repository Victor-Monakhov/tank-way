import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appStartPosition]'
})
export class StartPositionDirective {


  constructor(private el: ElementRef) {
    const element = el.nativeElement;
    //const red1 = element.querySelector('');
    //red1.onload = () =>console.log(red1);
  }

}
