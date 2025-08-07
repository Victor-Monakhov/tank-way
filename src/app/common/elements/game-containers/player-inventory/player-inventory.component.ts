import { NgClass, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  Renderer2,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { InventoryService } from '../../../../pages/welcome-page/services/inventory/inventory.service';
import { ITankItem } from '../../../resources/interfaces/tank.interface';

@Component({
  standalone: true,
  selector: 'tnm-player-inventory',
  imports: [
    NgOptimizedImage,
    NgClass,
  ],
  templateUrl: './player-inventory.component.html',
  styleUrl: './player-inventory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInventoryComponent implements OnInit {

  private readonly renderer = inject(Renderer2);
  private readonly inventoryService = inject(InventoryService);
  private readonly dr = inject(DestroyRef);

  inventory = input.required<ITankItem[][]>();
  saveInventory = output<ITankItem[][]>();

  dragIndex = 0;

  ngOnInit(): void {
    this.observeTankItemChanged();
  }

  onDrop(dropIndex: number, event: DragEvent): void {
    const inventory = this.inventory();
    const temp = inventory[this.dragIndex];
    inventory[this.dragIndex] = inventory[dropIndex];
    inventory[dropIndex] = temp;
    this.dragIndex = 0;
    this.onDragLeave(event);
    this.saveInventory.emit(inventory);
  }

  onDragStart(dragIndex: number): void {
    this.dragIndex = dragIndex;
    this.inventoryService.inventoryDraggingData = this.inventory()[dragIndex][0];
  }

  onDoubleClick(index: number): void {
    const item = this.inventory()[index][0];
    this.inventoryService.inventoryDraggingData = item;
    this.inventoryService.inventoryItemClicked$.next(item);
  }

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

  private observeTankItemChanged(): void {
    this.inventoryService.tankItemChanged$.pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(gameItem => {
      const inventory = this.inventory();
      const droppedGameItem = this.inventoryService.inventoryDraggingData;
      let gameItemPushed = false;
      inventory.forEach(item => {
        if (item.length && item[0].path === gameItem.path) {
          item.push(gameItem);
          gameItemPushed = true;
        }
        if (item.length && item[0].path === droppedGameItem.path) {
          item.pop();
          this.inventoryService.inventoryDraggingData = null;
        }
      });
      if (!gameItemPushed) {
        const freeCell = inventory.find(item => !item.length);
        if (freeCell) {
          freeCell.push(gameItem);
        }
      }
      this.saveInventory.emit(inventory);
    });
  }
}
