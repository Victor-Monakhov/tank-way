import { AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy, OnInit,
  viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { ELSKeys } from '../../common/resources/enums/local-storage.enum';
import { GameSettingsService } from '../../common/resources/services/game-settings/game-settings.service';

import { Game } from '@victor_monakhov/tanks';

@Component({
  standalone: true,
  selector: 'tnm-demo',
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent implements OnInit, AfterViewInit, OnDestroy {
  demoPanelRef = viewChild<ElementRef<HTMLElement>>('demoPanel');
  canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  private readonly gameService = inject(GameSettingsService);
  private readonly router = inject(Router);
  private game!: Game;

  ngOnInit(): void {
    if (localStorage.getItem(ELSKeys.InDemo)) {
      this.router.navigate(['welcome']).then();
    }
  }

  public ngAfterViewInit(): void {
    if (!localStorage.getItem(ELSKeys.InDemo)) {
      localStorage.setItem(ELSKeys.InDemo, JSON.stringify('inDemo'));
      const demoPanel = this.demoPanelRef().nativeElement;
      const canvas: HTMLCanvasElement = this.canvasRef().nativeElement;
      if (demoPanel.clientHeight > demoPanel.clientWidth) {
        canvas.width = demoPanel.clientHeight - 160;
        canvas.height = demoPanel.clientWidth - 10;
        canvas.style.transform = 'rotate(90deg)';
      } else {
        canvas.width = demoPanel.clientWidth - 160;
        canvas.height = demoPanel.clientHeight - 10;
      }
      this.startGame(canvas);
      onbeforeunload = (): void => {
        if (this.game) {
          this.game.destroy();
        }
      };
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem(ELSKeys.InDemo);
    if (this.game) {
      this.game.destroy();
    }
  }

  onClose(): void {
    this.router.navigate(['']).then();
  }

  private startGame(canvas: HTMLCanvasElement): void {
    this.game = new Game(canvas, this.gameService.demoSettings);
    this.game.run();
  }
}
