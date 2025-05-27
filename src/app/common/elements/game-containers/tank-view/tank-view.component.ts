import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { Calculations } from '../../../../shared/classes/calculations/calculations.class';
import { ITankHead } from '../../../resources/interfaces/tank.interface';
import { InputTextComponent } from "../../../../shared/components/input-text/input-text.component";

@Component({
  selector: 'tnm-tank-view',
  imports: [
    NgOptimizedImage,
    InputTextComponent,
  ],
  templateUrl: './tank-view.component.html',
  styleUrl: './tank-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankViewComponent {


  selectedTankHead = input.required<ITankHead>();
  selectedTankBody = input.required<ITankHead>();

  targetAngle = signal<number>(0);

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

}
