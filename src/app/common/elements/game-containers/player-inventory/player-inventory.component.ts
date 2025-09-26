import { NgClass, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  Renderer2,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { delay, merge } from 'rxjs';

import {
  TankItemTransactionService,
} from '../../../../pages/welcome-page/services/tank-item-transaction/tank-item-transaction.service';
import { copy, swap } from '../../../../shared/constants/utils';
import {
  ETankItemType,
  ETankTransactionHosts,
  ETankTransactionTargets,
  ETankTransactionTypes,
} from '../../../resources/enums/game.enum';
import { IBullet, ITankItem, ITankTransactionItem } from '../../../resources/interfaces/tank.interface';
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
  inventoryClone = computed(() => copy(this.inventory()));
  saveInventory = output<ITankItem[]>();

  tankItemType = ETankItemType;
  dragIndex: number | null = null;

  ngOnInit(): void {
    this.observeTankItem();
    this.observeInventoryTankTransactionReady();
    this.observeTransactionResult();
  }

  onInventoryItemDrop(index: number | null, event?: DragEvent): void {
    if (Number.isInteger(this.dragIndex)) {
      const updatedInventory: ITankItem[] = swap(this.inventoryClone(), this.dragIndex, index);
      this.saveInventory.emit(updatedInventory);
    }

    const transactionType = this.tankItemTransactionService.getTransactionType(
      this.tankItemTransactionService.transactionHost,
      ETankTransactionTargets.Inventory,
    );
    if (this.tankItemTransactionService.transactionTankItemType === ETankItemType.Bullet &&
      transactionType === ETankTransactionTypes.TankInventory) {
      const newTankItem: ITankItem = this.tankItemTransactionService.transactionNewItem;
      const possibleIndex: number = this.inventoryClone().findIndex(
        item => item?.name === newTankItem.name,
      );
      if (index === null ||
        (this.inventoryClone()[index] && this.inventoryClone()[index]?.itemType !== ETankItemType.Bullet)) {
        index = this.inventoryClone().findIndex(item => !item);
      }
      const actualIndex: number | null = possibleIndex >= 0 ? possibleIndex : index >= 0 ? index : null;
      if (actualIndex === null) {
        this.tankItemTransactionService.destroyTransaction();
      }
      const oldBullet: ITankItem = this.inventoryClone()[actualIndex];
      this.tankItemTransactionService.startTransaction(oldBullet, ETankTransactionTargets.Inventory);
      const tankTransactionItem: Readonly<ITankTransactionItem> =
        this.tankItemTransactionService.fillTransaction(newTankItem.quantity);
      if (tankTransactionItem) {
        this.inventoryClone()[actualIndex] = tankTransactionItem.newItem as IBullet;
      }
    }

    if (event) {
      this.onInventoryItemDragLeave(event);
    }

    this.dragIndex = null;
  }

  onInventoryItemDragStart(dragIndex: number): void {
    this.dragIndex = dragIndex;
    const newItem: ITankItem = this.inventoryClone()[dragIndex];
    this.tankItemTransactionService.createTransaction(newItem, ETankTransactionHosts.Inventory);
  }

  onInventoryItemDragEnd(): void {
    this.dragIndex = null;
    if (!this.tankItemTransactionService.transactionInProgress) {
      this.tankItemTransactionService.destroyTransaction();
    }
  }

  onInventoryItemDoubleClick(index: number): void {
    const item = this.inventoryClone()[index];
    this.tankItemTransactionService.createTransaction(item, ETankTransactionHosts.Inventory);
    this.tankItemTransactionService.inventoryItemClicked$.next();
  }

  onInventoryItemDragEnter(event: DragEvent): void {
    event.stopImmediatePropagation();
    const el = event.target as HTMLDivElement;
    this.renderer.setStyle(el, 'border-width', '3px');
  }

  onInventoryItemDragLeave(event: DragEvent): void {
    event.stopImmediatePropagation();
    const el = event.target as HTMLDivElement;
    this.renderer.setStyle(el, 'border-width', '1px');
  }

  private observeTankItem(): void {
    this.tankItemTransactionService.tankItemClicked$.pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(() => {
      switch (this.tankItemTransactionService.transactionTankItemType) {
        case ETankItemType.Bullet: {
          this.onInventoryItemDrop(null);
          break;
        }
      }
    });
  }

  private observeInventoryTankTransactionReady(): void {
    this.tankItemTransactionService.inventoryTankTransactionReady$.pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(tankTransactionItem => {
      const updatedInventory: ITankItem[] = this.tankItemTransactionService.handleTransactionCompletion(
        this.inventoryClone(),
        tankTransactionItem,
      );
      for (let i = 0; i < this.inventoryClone().length; ++i) {
        this.inventoryClone()[i] = updatedInventory[i];
      }
    });
  }

  private observeTransactionResult(): void {
    merge(
      this.tankItemTransactionService.tankInventoryTransactionCompleted$,
      this.tankItemTransactionService.inventoryTankTransactionCompleted$,
    ).pipe(
      delay(0),
      takeUntilDestroyed(this.dr),
    ).subscribe(result => {
      result ? this.saveInventory.emit(this.inventoryClone()) : this.saveInventory.emit(this.inventory());
    });
  }
}
