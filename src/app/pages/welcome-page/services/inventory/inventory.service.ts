import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { tankDefaultTransactionItem } from '../../../../common/resources/constants/tank-settings';
import { ITankItem, ITankTransactionItem } from '../../../../common/resources/interfaces/tank.interface';
import { copy } from '../../../../shared/constants/utils';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  private transactionItem: ITankTransactionItem = tankDefaultTransactionItem;

  isDragging = false;
  inventoryDraggingData: ITankItem = null;
  tankTransactionComplete$ = new Subject<ITankTransactionItem>();
  inventoryItemClicked$ = new Subject<ITankItem>();

  startTransaction(oldItem: ITankItem, newItem: ITankItem, cellIndex = 0): Readonly<ITankTransactionItem> {
    this.transactionItem.isTransaction = true;
    this.transactionItem.cellIndex = cellIndex;
    this.transactionItem.oldItem = copy(oldItem);
    this.transactionItem.newItem = copy(newItem);
    this.transactionItem.remainedItem = { ...copy(newItem), quantity: 0 };
    return Object.freeze(copy(this.transactionItem));
  }

  finishTransaction(quantity: number, replace = false): Readonly<ITankTransactionItem> | null {
    const condition1 = !this.transactionItem.isTransaction;
    const condition2 = this.transactionItem.newItem.quantity < quantity;
    if (condition1 || condition2) {
      return null;
    }
    this.transactionItem.remainedItem.quantity = this.transactionItem.newItem.quantity - quantity;
    if (replace || this.transactionItem.oldItem?.name !== this.transactionItem.newItem.name) {
      this.transactionItem.newItem.quantity = quantity;
    } else {
      this.transactionItem.newItem.quantity = this.transactionItem.oldItem.quantity + quantity;
      this.transactionItem.oldItem.quantity = 0;
    }
    this.transactionItem.isTransaction = false;
    return Object.freeze(copy(this.transactionItem));
  }
}
