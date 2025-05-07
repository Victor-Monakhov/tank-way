import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { NgScrollbarModule } from 'ngx-scrollbar';

import { tankBodies, tankHeads } from '../../../../common/resources/constants/tank-settings';
import { ITankBody, ITankHead } from '../../../../common/resources/interfaces/tank.interface';
import { StateService } from '../../../../common/resources/services/state/state.service';
import { Calculations } from '../../../../shared/classes/calculations/calculations.class';
import { DemoSettingsPanelComponent } from '../demo-settings-panel/demo-settings-panel.component';

@Component({
  standalone: true,
  selector: 'tnm-tank-settings',
  imports: [
    DemoSettingsPanelComponent,
    NgScrollbarModule,
    NgOptimizedImage,
    NgClass,
    MatButtonModule,
  ],
  templateUrl: './tank-settings.component.html',
  styleUrl: './tank-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankSettingsComponent {

  private readonly stateService = inject(StateService);

  readonly viewHeight: number = 150;
  readonly viewWidth: number = 200;
  readonly tankHeads: ITankHead[] = tankHeads;
  readonly tankBodies: ITankBody[] = tankBodies;

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
      const gameSettings = this.stateService.demoGameSettings();
      if (gameSettings) {
        this.tankHeadIndex.set(this.tankHeads.findIndex(item => item.name === gameSettings.tankHead));
        this.tankBodyIndex.set(this.tankBodies.findIndex(item => item.name === gameSettings.tankBody));
      }
    });
  }

  public onTarget(event: MouseEvent): void {
    this.targetAngle.set(Calculations.getAngleBetweenCenterAndPoint(
      this.viewWidth,
      this.viewHeight,
      event.offsetX,
      event.offsetY,
    ));
  }

  public onHead(head: ITankHead, index: number): void {
    this.tankHeadIndex.set(index);
    this.stateService.updateDemoGameSettingsState({
      tankHead: head.name,
      tankBody: this.selectedTankBody().name,
    });
  }

  public onBody(body: ITankBody, index: number): void {
    this.tankBodyIndex.set(index);
    this.stateService.updateDemoGameSettingsState({
      tankBody: body.name,
      tankHead: this.selectedTankHead().name,
    });
  }

}
