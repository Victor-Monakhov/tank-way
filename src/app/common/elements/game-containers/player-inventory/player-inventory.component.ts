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
import { ETankItemType } from '../../../resources/enums/game.enum';
import { ITankItem } from '../../../resources/interfaces/tank.interface';
import { RotateBulletPipe } from '../../../resources/pipes/rotate-bullet/rotate-bullet.pipe';

@Component({
  standalone: true,
  selector: 'tnm-player-inventory',
  imports: [
    NgOptimizedImage,
    NgClass,
    RotateBulletPipe,
  ],
  templateUrl: './player-inventory.component.html',
  styleUrl: './player-inventory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInventoryComponent implements OnInit {

  private readonly renderer = inject(Renderer2);
  private readonly inventoryService = inject(InventoryService);
  private readonly dr = inject(DestroyRef);

  inventory = input.required<ITankItem[]>();
  saveInventory = output<ITankItem[]>();

  tankItemType = ETankItemType;
  dragIndex: number | null = null;

  ngOnInit(): void {
    this.observeTankItemChanged();
  }

  onDrop(dropIndex: number, event: DragEvent): void {
    if (Number.isInteger(this.dragIndex)) {
      const inventory = this.inventory();
      const temp = inventory[this.dragIndex];
      inventory[this.dragIndex] = inventory[dropIndex];
      inventory[dropIndex] = temp;
      this.saveInventory.emit(inventory);
    }
    this.onDragLeave(event);
    this.dragIndex = null;
  }

  onDragStart(dragIndex: number): void {
    this.dragIndex = dragIndex;
    this.inventoryService.isDragging = true;
    this.inventoryService.inventoryDraggingData = this.inventory()[dragIndex];
  }

  onDragEnd(): void {
    this.dragIndex = null;
  }

  onDoubleClick(index: number): void {
    const item = this.inventory()[index];
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
    this.inventoryService.tankTransactionComplete$.pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(tankTransformationItem => {
      const inventory = this.inventory();
      const oldTankItem = tankTransformationItem.oldItem;
      const remainedTankItem = tankTransformationItem.remainedItem;
      let gameItemPushed = false;
      inventory.forEach((item, index) => {
        if (item?.quantity && item.name === oldTankItem?.name) {
          item.quantity += oldTankItem.quantity;
          gameItemPushed = true;
        }
        if (item?.quantity && item.name === remainedTankItem.name) {
          item.quantity = remainedTankItem.quantity;
          if (!item.quantity) {
            inventory[index] = null;
          }
        }
      });
      if (!gameItemPushed) {
        const freeCellIndex = inventory.findIndex(item => !item?.quantity);
        if (freeCellIndex >= 0) {
          inventory[freeCellIndex] = oldTankItem;
          if (!inventory[freeCellIndex]?.quantity) {
            inventory[freeCellIndex] = null;
          }
        }
      }
      this.saveInventory.emit(inventory);
    });
  }
}
