import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSlider]'
})
export class SliderDirective implements AfterViewInit {

  //width: string = '100px';

  constructor(private rd: Renderer2, private el:ElementRef ) {
    
    
   }

   ngAfterViewInit(){
    //console.log(this.el.nativeElement.clientWidth);

   }
}
