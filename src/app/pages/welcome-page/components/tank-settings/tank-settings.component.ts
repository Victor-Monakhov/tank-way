import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { NgScrollbarModule } from 'ngx-scrollbar';

import { ITankBody, ITankHead, ITankSettings } from '../../../../common/resources/interfaces/tank.interface';
import { Calculations } from '../../../../shared/classes/calculations/calculations.class';
import { DemoSettingsPanelComponent } from '../demo-settings-panel/demo-settings-panel.component';

import { tankBodies, tankHeads } from './tank-settings';

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

  readonly viewHeight: number = 150;
  readonly viewWidth: number = 200;
  readonly tankHeads: ITankHead[] = tankHeads;
  readonly tankBodies: ITankBody[] = tankBodies;

  tankSettings = output<ITankSettings>();

  targetAngle = signal<number>(0);
  tankHeadIndex = signal<number>(0);
  tankBodyIndex = signal<number>(0);
  selectedTankHead = computed<ITankHead>(
    () => Number.isInteger(this.tankHeadIndex()) ? this.tankHeads[this.tankHeadIndex()] : null,
  );
  selectedTankBody = computed<ITankHead>(
    () => Number.isInteger(this.tankBodyIndex()) ? this.tankBodies[this.tankBodyIndex()] : null,
  );

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
    this.tankSettings.emit({
      head,
      body: this.selectedTankBody(),
    });
  }

  public onBody(body: ITankBody, index: number): void {
    this.tankBodyIndex.set(index);
    this.tankSettings.emit({
      body,
      head: this.selectedTankHead(),
    });
  }

}
