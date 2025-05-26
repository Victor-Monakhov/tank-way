import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect, ElementRef,
  inject, Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgScrollbarModule } from 'ngx-scrollbar';

import { tankBodies, tankHeads } from '../../../../common/resources/constants/tank-settings';
import { IDemoGame } from '../../../../common/resources/interfaces/game.interface';
import { IDemoTank, ITankBody, ITankHead } from '../../../../common/resources/interfaces/tank.interface';
import { StateService } from '../../../../common/resources/services/state/state.service';
import { Calculations } from '../../../../shared/classes/calculations/calculations.class';
import { GameShopBtnComponent } from '../../../../shared/components/game-buttons/game-shop-btn/game-shop-btn.component';

@Component({
  standalone: true,
  selector: 'tnm-tank-settings',
  imports: [
    NgScrollbarModule,
    NgOptimizedImage,
    MatButtonModule,
    GameShopBtnComponent,
    MatIconModule,
  ],
  templateUrl: './tank-settings.component.html',
  styleUrl: './tank-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankSettingsComponent {

  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event): void {
  //   const wrapperEl = this.wrapperRef().nativeElement;
  //   const el = this.elRef.nativeElement as HTMLElement;
  //   console.log(el.clientWidth);
  //   this.renderer.setStyle(wrapperEl, 'width', `${el.clientWidth}px`);
  // }

  private readonly stateService = inject(StateService);
  private readonly renderer = inject(Renderer2);
  private readonly elRef = inject(ElementRef);
  private game!: IDemoGame;
  private tank!: IDemoTank;

  readonly tankHeads: ITankHead[] = tankHeads;
  readonly tankBodies: ITankBody[] = tankBodies;

  wrapperRef = viewChild<ElementRef<HTMLDivElement>>('wrapper');
  targetAngle = signal<number>(0);
  tankHeadIndex = signal<number>(0);
  tankBodyIndex = signal<number>(0);
  selectedTankHead = computed<ITankHead>(
    () => Number.isInteger(this.tankHeadIndex()) ? this.tankHeads[this.tankHeadIndex()] : null,
  );
  selectedTankBody = computed<ITankHead>(
    () => Number.isInteger(this.tankBodyIndex()) ? this.tankBodies[this.tankBodyIndex()] : null,
  );

  constructor() {
    effect(() => {
      this.game = this.stateService.demoGame();
      if (this.game) {
        this.tank = this.game.tanks.find(item => item.chosenAsPlayer);
        if (this.tank) {
          this.tankHeadIndex.set(this.tankHeads.findIndex(item => item.name === this.tank.head.name));
          this.tankBodyIndex.set(this.tankBodies.findIndex(item => item.name === this.tank.body.name));
        }
      }
    });
  }

  onMouseLeave(el: HTMLDivElement): void {
    this.targetAngle.set(0);
  }

  onTarget(event: MouseEvent, el: HTMLDivElement): void {
    const viewWidth = el.clientWidth;
    const viewHeight = el.clientHeight;
    this.targetAngle.set(Calculations.getAngleBetweenCenterAndPoint(
      viewWidth,
      viewHeight,
      event.offsetX,
      event.offsetY,
    ));
  }

  onHead(head: ITankHead, index: number): void {
    this.tankHeadIndex.set(index);
    this.tank.head.name = head.name;
    this.tank.body.name = this.selectedTankBody().name;
    this.stateService.updateDemoGameState(this.game);
  }

  onBody(body: ITankBody, index: number): void {
    this.tankBodyIndex.set(index);
    this.tank.head.name = this.selectedTankHead().name;
    this.tank.body.name = body.name;
    this.stateService.updateDemoGameState(this.game);
  }

}
