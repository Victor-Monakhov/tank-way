import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatButton } from '@angular/material/button';

import { getTankCharacteristics } from '../../../resources/constants/tank-settings';
import { IDemoTank, ITankCharacteristic } from '../../../resources/interfaces/tank.interface';

@Component({
  standalone: true,
  selector: 'tnm-tank-modernization',
  imports: [
    NgOptimizedImage,
    MatButton,

  ],
  templateUrl: './tank-modernization.component.html',
  styleUrl: './tank-modernization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankModernizationComponent {

  tank = input.required<IDemoTank>();

  characteristics = computed<ITankCharacteristic[]>(() => getTankCharacteristics(this.tank()));

}
