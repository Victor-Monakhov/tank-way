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

import {
  TankItemTransactionService,
} from '../../../../pages/welcome-page/services/tank-item-transaction/tank-item-transaction.service';
import { ETankItemType, ETankTransactionHosts } from '../../../resources/enums/game.enum';
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
  private readonly tankItemTransactionService = inject(TankItemTransactionService);
  private readonly dr = inject(DestroyRef);

  inventory = input.required<ITankItem[]>();
  saveInventory = output<ITankItem[]>();

  tankItemType = ETankItemType;
  dragIndex: number | null = null;

  ngOnInit(): void {
    this.observeInventoryTankTransaction();
  }

  onDrop(dropIndex: number, event: DragEvent): void {
    if (Number.isInteger(this.dragIndex)) {
      const inventory: ITankItem[] = this.inventory();
      const temp: ITankItem = inventory[this.dragIndex];
      inventory[this.dragIndex] = inventory[dropIndex];
      inventory[dropIndex] = temp;
      this.saveInventory.emit(inventory);
    }
    this.onDragLeave(event);
    this.dragIndex = null;
  }

  onDragStart(dragIndex: number): void {
    this.dragIndex = dragIndex;
    const newItem: ITankItem = this.inventory()[dragIndex];
    this.tankItemTransactionService.createTransaction(newItem, ETankTransactionHosts.Inventory);
  }

  onDragEnd(): void {
    this.dragIndex = null;
    if (!this.tankItemTransactionService.transactionInProgress) {
      this.tankItemTransactionService.destroyTransaction();
    }
  }

  onDoubleClick(index: number): void {
    const item = this.inventory()[index];
    this.tankItemTransactionService.createTransaction(item, ETankTransactionHosts.Inventory);
    this.tankItemTransactionService.inventoryItemClicked$.next();
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

  private observeInventoryTankTransaction(): void {
    this.tankItemTransactionService.inventoryTankTransactionComplete$.pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(tankTransactionItem => {
      const updatedInventory: ITankItem[] = this.tankItemTransactionService.handleInventoryTankTransactionCompletion(
        this.inventory(),
        tankTransactionItem,
      );
      this.saveInventory.emit(updatedInventory);
    });
  }
}
