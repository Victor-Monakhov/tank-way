import {AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DemoService } from '../services/demo.service';
import { Game } from '@victor_monakhov/tanks';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  providers: [DemoService]
})
export class DemoComponent implements OnInit, AfterViewInit{

  private readonly 
  @ViewChild('demoPanel') public demoPanelRef: ElementRef;
  @ViewChild('canvas') public canvasRef: ElementRef;


  constructor(public el: ElementRef, public tgService: DemoService) {
  }

  ngOnInit(): void { 
    
  }

  ngAfterViewInit(){
    const demoPanel = this.demoPanelRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    if(demoPanel.clientHeight > demoPanel.clientWidth){
      canvas.width = demoPanel.clientHeight - 160;
      canvas.height = demoPanel.clientWidth - 10;
      canvas.style.transform = 'rotate(90deg)';
    } else {
      canvas.width = demoPanel.clientWidth - 160;
      canvas.height = demoPanel.clientHeight - 10;
    }
     
     


    this.startGame(canvas);
  }

  private startGame(canvas: HTMLElement){
    const game = new Game(canvas);
    game.run();
  }

  onClick(){
    
  }
}
