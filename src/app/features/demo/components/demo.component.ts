import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DemoService} from '../services/demo-service/demo.service';
import {Game} from '@victor_monakhov/tanks';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {LSKeys} from '../../../shared/enums/local-storage-keys.enum';
import {Router} from '@angular/router';
import {NAVIGATE} from '../../../app.config';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('demoPanel') public demoPanelRef: ElementRef;
  @ViewChild('canvas') public canvasRef: ElementRef;


  public constructor(private demoService: DemoService,
                     private lsService: LocalStorageService,
                     private router: Router) {
  }

  public ngOnInit(): void {
    if (localStorage.getItem(LSKeys.inDemo)) {
      this.router.navigate([NAVIGATE.HOME]).then();
    }
  }

  public ngAfterViewInit(): void {
    this.lsService.setItem(LSKeys.inDemo, 'inDemo');
    const demoPanel = this.demoPanelRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    if (demoPanel.clientHeight > demoPanel.clientWidth) {
      canvas.width = demoPanel.clientHeight - 160;
      canvas.height = demoPanel.clientWidth - 10;
      canvas.style.transform = 'rotate(90deg)';
    } else {
      canvas.width = demoPanel.clientWidth - 160;
      canvas.height = demoPanel.clientHeight - 10;
    }
    this.startGame(canvas);
  }

  public ngOnDestroy(): void {
    localStorage.removeItem(LSKeys.inDemo);
  }

  private startGame(canvas: HTMLElement): void {
    const game = new Game(canvas, this.demoService.demoSettings);
    game.run();
  }
}
