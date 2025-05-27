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

import {
  TankDetailContainerComponent,
} from '../../../../common/elements/game-containers/tank-detail-container/tank-detail-container.component';
import {
  TankInventionsComponent,
} from '../../../../common/elements/game-containers/tank-inventory/tank-inventions.component';
import { TankViewComponent } from '../../../../common/elements/game-containers/tank-view/tank-view.component';
import { tankBodies, tankHeads } from '../../../../common/resources/constants/tank-settings';
import { IDemoGame } from '../../../../common/resources/interfaces/game.interface';
import { IDemoTank, ITankBody, ITankHead } from '../../../../common/resources/interfaces/tank.interface';
import { StateService } from '../../../../common/resources/services/state/state.service';

@Component({
  standalone: true,
  selector: 'tnm-tank-settings',
  imports: [
    NgScrollbarModule,
    MatButtonModule,
    MatIconModule,
    TankDetailContainerComponent,
    TankInventionsComponent,
    TankViewComponent,
  ],
  templateUrl: './tank-settings.component.html',
  styleUrl: './tank-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankSettingsComponent {


  private readonly stateService = inject(StateService);
  private readonly renderer = inject(Renderer2);
  private readonly elRef = inject(ElementRef);
  private game!: IDemoGame;

  readonly tankHeads: ITankHead[] = tankHeads;
  readonly tankBodies: ITankBody[] = tankBodies;

  wrapperRef = viewChild<ElementRef<HTMLDivElement>>('wrapper');
  tank = signal<IDemoTank | null>(null);

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
        this.tank.set(this.game.tanks.find(item => item.chosenAsPlayer));
        if (this.tank) {
          this.tankHeadIndex.set(this.tankHeads.findIndex(item => item.name === this.tank().head.name));
          this.tankBodyIndex.set(this.tankBodies.findIndex(item => item.name === this.tank().body.name));
        }
      }
    });
  }

  onHead(head: ITankHead, index: number): void {
    this.tankHeadIndex.set(index);
    this.tank().head.name = head.name;
    this.tank().body.name = this.selectedTankBody().name;
    this.stateService.updateDemoGameState(this.game);
  }

  onBody(body: ITankBody, index: number): void {
    this.tankBodyIndex.set(index);
    this.tank().head.name = this.selectedTankHead().name;
    this.tank().body.name = body.name;
    this.stateService.updateDemoGameState(this.game);
  }

}
