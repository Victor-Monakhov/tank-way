import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { tankDefaultTransactionItem } from '../../../../common/resources/constants/tank-settings';
import {
  ETankItemType,
  ETankTransactionHosts,
  ETankTransactionTargets,
  ETankTransactionTypes,
} from '../../../../common/resources/enums/game.enum';
import {
  ITankItem,
  ITankTransactionItem,
} from '../../../../common/resources/interfaces/tank.interface';
import { copy } from '../../../../shared/constants/utils';

@Injectable({
  providedIn: 'root',
})
export class TankItemTransactionService {

  private transactionItem: ITankTransactionItem = copy(tankDefaultTransactionItem);

  private inventoryTankTransaction$ = new Subject<Readonly<ITankTransactionItem>>();
  private tankInventoryTransaction$ = new Subject<Readonly<ITankTransactionItem>>();
  private inventoryTankTransactionResult$ = new Subject<boolean>();
  private tankInventoryTransactionResult$ = new Subject<boolean>();

  inventoryTankTransactionReady$ =
    this.inventoryTankTransaction$ as Observable<Readonly<ITankTransactionItem>>;
  tankInventoryTransactionReady$ =
    this.tankInventoryTransaction$ as Observable<Readonly<ITankTransactionItem>>;
  inventoryTankTransactionCompleted$ =
    this.inventoryTankTransactionResult$ as Observable<boolean>;
  tankInventoryTransactionCompleted$ =
    this.tankInventoryTransactionResult$ as Observable<boolean>;

  inventoryItemClicked$ = new Subject<void>();
  tankItemClicked$ = new Subject<void>();

  get transactionInProgress(): boolean {
    return this.transactionItem.type !== ETankTransactionTypes.NoTransaction;
  }

  get transactionTankItemType(): ETankItemType | null {
    return this.transactionItem?.newItem?.itemType ?? null;
  }

  get transactionNewItem(): ITankItem | null {
    return this.transactionItem?.newItem ?? null;
  }

  get transactionHost(): ETankTransactionHosts | null {
    return this.transactionItem?.host ?? null;
  }

  createTransaction(newItem: ITankItem, host: ETankTransactionHosts): void {
    this.transactionItem.host = host;
    this.transactionItem.newItem = copy(newItem);
    this.transactionItem.remainedItem = { ...copy(newItem), quantity: 0 };
  }

  startTransaction(
    oldItem: ITankItem,
    target: ETankTransactionTargets,
  ): Readonly<ITankTransactionItem> | null {
    if (this.transactionItem.host === ETankTransactionHosts.NoHost) {
      this.destroyTransaction();
      return null;
    }
    this.transactionItem.target = target;
    this.transactionItem.type = this.getTransactionType(this.transactionItem.host, target);
    this.transactionItem.oldItem = copy(oldItem);
    return Object.freeze(copy(this.transactionItem));
  }

  fillTransaction(quantity: number, replace = false): Readonly<ITankTransactionItem> | null {
    const condition1 = this.transactionItem.type === ETankTransactionTypes.NoTransaction;
    const condition2 = this.transactionItem.newItem.quantity < quantity;
    if (condition1 || condition2) {
      this.destroyTransaction();
      return null;
    }
    this.transactionItem.remainedItem.quantity = this.transactionItem.newItem.quantity - quantity;
    if (replace || this.transactionItem.oldItem?.name !== this.transactionItem.newItem.name) {
      if (this.transactionItem.oldItem?.name === this.transactionItem.newItem.name) {
        this.transactionItem.remainedItem.quantity += this.transactionItem.oldItem.quantity;
      }
      this.transactionItem.newItem.quantity = quantity;
    } else {
      this.transactionItem.newItem.quantity = (this.transactionItem.oldItem?.quantity ?? 0) + quantity;
      this.transactionItem.oldItem = null;
    }
    const transactionClone = copy(this.transactionItem);
    this.destroyTransaction();
    switch (transactionClone.type) {
      case ETankTransactionTypes.InventoryTank:
        this.inventoryTankTransaction$.next(transactionClone);
        break;
      case ETankTransactionTypes.TankInventory:
        this.tankInventoryTransaction$.next(transactionClone);
        break;
    }
    return Object.freeze(transactionClone);
  }

  destroyTransaction(): void {
    this.transactionItem = copy(tankDefaultTransactionItem);
  }

  handleTransactionCompletion(
    hostItems: ITankItem[],
    transactionItem: Readonly<ITankTransactionItem>,
  ): ITankItem[] {
    const hostItemsClone: ITankItem[] = copy(hostItems);
    const oldTankItem: ITankItem = transactionItem.oldItem;
    const remainedTankItem: ITankItem = transactionItem.remainedItem;
    let oldTankItemAdded = false;
    let remainedTankItemAdded = false;
    hostItemsClone.forEach((item, index) => {
      if (item?.quantity && item.name === oldTankItem?.name && !oldTankItemAdded) {
        item.quantity += oldTankItem.quantity;
        oldTankItemAdded = true;
      }
      if (item?.quantity && item.name === remainedTankItem.name && !remainedTankItemAdded) {
        item.quantity = remainedTankItem.quantity;
        remainedTankItemAdded = true;
        if (!item.quantity) {
          hostItemsClone[index] = null;
        }
      }
    });
    if (!oldTankItemAdded) {
      const freeCellIndex = hostItemsClone.findIndex(item => !item?.quantity);
      if (freeCellIndex >= 0) {
        hostItemsClone[freeCellIndex] = oldTankItem;
        if (!hostItemsClone[freeCellIndex]?.quantity) {
          hostItemsClone[freeCellIndex] = null;
        }
      } else {
        this.sendTransactionResult(transactionItem.type, false);
        return hostItems;
      }
    }
    this.sendTransactionResult(transactionItem.type, true);
    return hostItemsClone;
  }

  getTransactionType(host: ETankTransactionHosts, target: ETankTransactionTargets): ETankTransactionTypes {
    if (host === ETankTransactionHosts.Inventory && target === ETankTransactionTargets.Tank) {
      return ETankTransactionTypes.InventoryTank;
    } else if (host === ETankTransactionHosts.Tank && target === ETankTransactionTargets.Inventory) {
      return ETankTransactionTypes.TankInventory;
    } else {
      return ETankTransactionTypes.NoTransaction;
    }
  }

  private sendTransactionResult(transactionType: ETankTransactionTypes, result: boolean): void {
    switch (transactionType) {
      case ETankTransactionTypes.InventoryTank:
        this.inventoryTankTransactionResult$.next(result);
        break;
      case ETankTransactionTypes.TankInventory:
        this.tankInventoryTransactionResult$.next(result);
        break;
    }
  }
}
