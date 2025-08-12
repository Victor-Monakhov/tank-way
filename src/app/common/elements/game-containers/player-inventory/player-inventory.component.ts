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

  private readonly rotateIcon = 60;

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
      this.onDragLeave(event);
      this.saveInventory.emit(inventory);
    }
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
    this.inventoryService.tankItemChanged$.pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(gameItem => {
      const inventory = this.inventory();
      const droppedGameItem = this.inventoryService.inventoryDraggingData;
      let gameItemPushed = false;
      inventory.forEach((item, index) => {
        if (item?.quantity && item.path === gameItem.path) {
          item.quantity++;
          gameItemPushed = true;
        }
        if (item?.quantity && item.path === droppedGameItem.path) {
          item.quantity--;
          if (!item.quantity) {
            inventory[index] = null;
          }
          this.inventoryService.inventoryDraggingData = null;
        }
      });
      if (!gameItemPushed) {
        const freeCellIndex = inventory.findIndex(item => !item?.quantity);
        if (freeCellIndex >= 0) {
          inventory[freeCellIndex] = gameItem;
          inventory[freeCellIndex].quantity++;
        }
      }
      this.saveInventory.emit(inventory);
    });
  }
}
