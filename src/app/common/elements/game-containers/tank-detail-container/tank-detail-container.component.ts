import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'tnm-tank-detail-container',
  imports: [
    NgOptimizedImage,
    NgClass,
  ],
  templateUrl: './tank-detail-container.component.html',
  styleUrl: './tank-detail-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankDetailContainerComponent {

  iconSrc = input.required<string>();
  isMany = input<boolean>(false);
  quantity = input<number>(0);

}
