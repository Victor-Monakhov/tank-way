import {AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { TestGameService } from '../services/test-game.service';
import { Game } from '@victor_monakhov/tanks';

@Component({
  selector: 'app-test-game',
  templateUrl: './test-game.component.html',
  styleUrls: ['./test-game.component.scss'],
  providers: [TestGameService]
})
export class TestGameComponent implements OnInit, AfterViewInit{

  //startFlag:boolean = false;
  testGamePanel: any;
  canvas: HTMLCanvasElement;

  constructor(public el: ElementRef, public tgService: TestGameService) {
  }

  ngOnInit(): void {
    document.body.style.overflow = "hidden";
    
    console.log(this.el.nativeElement.style.overflow);
    this.testGamePanel = this.el.nativeElement.lastChild;
    this.canvas = this.testGamePanel.lastChild;
    this.testGamePanel.width = window.innerWidth;
    this.testGamePanel.height = window.innerHeight;
    const padding = window.getComputedStyle(this.testGamePanel).getPropertyValue("padding-left");
    const paddingInt = parseInt(padding, 10);
    this.canvas.width = this.testGamePanel.width - 2 * paddingInt;
    this.canvas.height = this.testGamePanel.height - 2 * paddingInt;
  }

  ngAfterViewInit(){
    this.startGame();
  }

  private startGame(){
    const game = new Game(this.canvas);
    game.run();
  }

  onClick(){
    
  }
}
