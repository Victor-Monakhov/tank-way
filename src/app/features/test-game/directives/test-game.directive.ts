import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import { Game } from '@victor_monakhov/tanks';

@Directive({
  selector: '[appTestGame]'
})
export class TestGameDirective implements AfterViewInit{

  startFlag:boolean = false;

  constructor(private rd: Renderer2, private el:ElementRef) {
  }
  ngAfterViewInit(){
    this.startGame();
  }

  private startGame(){
    this.el.nativeElement.width = window.innerWidth;
    this.el.nativeElement.height = window.innerHeight;
    if(!this.startFlag){
      this.startFlag = true;
      
    }
    const game = new Game(this.el.nativeElement);
    game.run();
  }
}
