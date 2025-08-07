import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, Renderer2 } from '@angular/core';

import { IInvention } from '../../../resources/interfaces/tank.interface';

@Component({
  selector: 'tnm-tank-inventions',
  imports: [
    NgOptimizedImage,
    NgClass,
  ],
  templateUrl: './tank-inventions.component.html',
  styleUrl: './tank-inventions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankInventionsComponent {

  private readonly renderer = inject(Renderer2);

  inventions = input.required<IInvention[]>();

  onDragEnter(event: DragEvent): void {
    event.stopImmediatePropagation();
    const el = event.target as HTMLDivElement;
    this.renderer.setStyle(el, 'border-width', '3px');
  }

  onDragLeave(event: DragEvent): void {
    event.stopImmediatePropagation();
    const el = event.target as HTMLDivElement;
    this.renderer.setStyle(el, 'border-width', '1px');
  }
}
