import {
  ChangeDetectionStrategy,
  Component, effect,
  ElementRef,
  inject,
  OnDestroy,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { ELSKeys } from '../../common/resources/enums/local-storage.enum';
import { IDemoGameSettings } from '../../common/resources/interfaces/game.interface';
import { StateService } from '../../common/resources/services/state/state.service';

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
export class DemoComponent implements OnDestroy {
  demoPanelRef = viewChild<ElementRef<HTMLElement>>('demoPanel');
  canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  private readonly stateService = inject(StateService);
  private readonly router = inject(Router);
  private game!: Game;

  constructor() {
    effect(() => {
      if (localStorage.getItem(ELSKeys.InDemo)) {
        this.router.navigate(['welcome']).then();
      } else {
        const gameSettings = this.stateService.demoGameSettings();
        if (gameSettings) {
          localStorage.setItem(ELSKeys.InDemo, JSON.stringify(ELSKeys.InDemo));
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
          this.startGame(canvas, gameSettings);
          onbeforeunload = (): void => {
            if (this.game) {
              this.game.destroy();
            }
          };
        }
      }
    });
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

  private startGame(canvas: HTMLCanvasElement, settings: IDemoGameSettings): void {
    this.game = new Game(canvas, settings);
    this.game.run();
  }
}
