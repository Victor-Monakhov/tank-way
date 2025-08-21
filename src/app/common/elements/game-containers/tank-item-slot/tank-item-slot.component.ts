import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output, Renderer2 } from '@angular/core';

import { ITankItem } from '../../../resources/interfaces/tank.interface';

@Component({
  selector: 'tnm-tank-item-slot',
  imports: [
    NgOptimizedImage,
    NgClass,
  ],
  templateUrl: './tank-item-slot.component.html',
  styleUrl: './tank-item-slot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankItemSlotComponent {

  private readonly renderer = inject(Renderer2);

  tankItem = input<ITankItem>(null);
  multipleItems = input<boolean>(false);
  dragStart = output<ITankItem>();
  dragEnd = output<ITankItem>();

  iconSrc = computed<string>(() => this.tankItem()?.path);
  quantity = computed<number>(() => this.tankItem()?.quantity);

  onDragEnter(contentEl: HTMLDivElement): void {
    this.renderer.setStyle(contentEl, 'border-width', '3px');
  }

  onDragLeave(contentEl: HTMLDivElement): void {
    this.renderer.setStyle(contentEl, 'border-width', '1px');
  }

  onDrop(contentEl: HTMLDivElement): void {
    this.renderer.setStyle(contentEl, 'border-width', '1px');
  }

  onDragStart(): void {
    this.dragStart.emit(this.tankItem());
  }

  onDragEnd(): void {
    this.dragEnd.emit(this.tankItem());
  }

}
