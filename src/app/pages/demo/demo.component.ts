import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { Guid } from 'guid-typescript';

import { StateService } from '../../common/resources/services/state/state.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

import { DemoService } from './services/demo.service';

import { Game, GameSettings } from '@victor_monakhov/tanks';

@Component({
  standalone: true,
  selector: 'tnm-demo',
  imports: [
    MatButtonModule,
    MatIconModule,
    LoaderComponent,
    NgClass,
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent implements OnDestroy {

  private readonly stateService = inject(StateService);
  private readonly demoService = inject(DemoService);
  private readonly router = inject(Router);
  private game!: Game;

  demoPanelRef = viewChild<ElementRef<HTMLElement>>('demoPanel');
  canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  loader = signal<boolean>(true);

  constructor() {
    effect(() => {
      if (!this.stateService.inDemo) {
        this.router.navigate(['welcome']).then();
      } else {
        const gameSettings = this.stateService.demoGameSettings();
        if (gameSettings) {
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
          this.startGame(canvas, {
            ...gameSettings,
            playerName: this.stateService.demoPlayer().name,
          });
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
    this.stateService.inDemo = false;
    if (this.game) {
      this.game.destroy();
    }
  }

  onClose(): void {
    this.router.navigate(['']).then();
  }

  private startGame(canvas: HTMLCanvasElement, settings: GameSettings): void {
    const battleId = Guid.create().toString();
    this.game = new Game(canvas, settings);
    this.game.stateObserver(state => {
      if (this.loader()) {
        this.stateService.addDemoBattle(this.demoService.gameStateToDemoButtle(state, battleId));
      } else {
        this.stateService.updateDemoBattle(this.demoService.gameStateToDemoButtle(state, battleId));
      }
      this.loader.set(false);
    });
    this.game.run();
  }
}
