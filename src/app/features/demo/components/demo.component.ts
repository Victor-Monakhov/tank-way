import {AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DemoService } from '../services/demo-service/demo.service';
import { Game } from '@victor_monakhov/tanks';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit, AfterViewInit{

  @ViewChild('demoPanel') public demoPanelRef: ElementRef;
  @ViewChild('canvas') public canvasRef: ElementRef;


  constructor(private demoService: DemoService) {
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
    const pos = this.demoService.form.controls['position'].value;
    const game = new Game(canvas, pos);
    game.run();
  }
}
