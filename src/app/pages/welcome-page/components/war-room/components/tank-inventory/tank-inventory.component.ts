import {
  ChangeDetectionStrategy,
  Component, computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

import { delay, merge } from 'rxjs';

import {
  QuantityMenuComponent,
} from '../../../../../../common/elements/game-containers/quantity-menu/quantity-menu.component';
import {
  TankInventionsComponent,
} from '../../../../../../common/elements/game-containers/tank-inventions/tank-inventions.component';
import {
  TankItemSlotComponent,
} from '../../../../../../common/elements/game-containers/tank-item-slot/tank-item-slot.component';
import {
  ETankItemType,
  ETankTransactionHosts,
  ETankTransactionTargets,
} from '../../../../../../common/resources/enums/game.enum';
import { IQuantityResult } from '../../../../../../common/resources/interfaces/game.interface';
import {
  IBullet,
  IDemoTank,
  ITankItem,
  ITankTransactionItem,
} from '../../../../../../common/resources/interfaces/tank.interface';
import { copy, swap } from '../../../../../../shared/constants/utils';
import { TankItemTransactionService } from '../../../../services/tank-item-transaction/tank-item-transaction.service';

@Component({
  standalone: true,
  selector: 'tnm-tank-inventory',
  imports: [
    TankItemSlotComponent,
    MatButton,
    MatMenuModule,
    QuantityMenuComponent,
    TankInventionsComponent,
  ],
  templateUrl: './tank-inventory.component.html',
  styleUrl: './tank-inventory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankInventoryComponent implements OnInit {

  private readonly tankItemTransactionService = inject(TankItemTransactionService);
  private readonly dr = inject(DestroyRef);

  private itemQuantityChanged = false;
  private bulletActiveIndex: number | null = null;

  tank = input.required<IDemoTank>();
  saveTank = output<IDemoTank>();
  matTriggers = viewChildren(MatMenuTrigger);
  quantityMenus = viewChildren(QuantityMenuComponent);

  tankClone = computed<IDemoTank>(() => copy(this.tank()));

  ngOnInit(): void {
    this.observeInventoryItem();
    this.observeTankInventoryTransactionReady();
    this.observeTransactionResult();
  }

  onTurretChange(): void {
    if (this.tankItemTransactionService.transactionTankItemType === ETankItemType.TankTurret) {
      this.tankItemTransactionService.startTransaction(this.tankClone().turret, ETankTransactionTargets.Tank);
      const tankTransactionItem: Readonly<ITankTransactionItem> =
        this.tankItemTransactionService.fillTransaction(1, true);
      if (tankTransactionItem) {
        this.tankClone().turret = tankTransactionItem.newItem;
      }
    } else {
      this.tankItemTransactionService.destroyTransaction();
    }
  }

  onHullChange(): void {
    if (this.tankItemTransactionService.transactionTankItemType === ETankItemType.TankHull) {
      this.tankItemTransactionService.startTransaction(this.tankClone().hull, ETankTransactionTargets.Tank);
      const tankTransactionItem: Readonly<ITankTransactionItem> =
        this.tankItemTransactionService.fillTransaction(1, true);
      if (tankTransactionItem) {
        this.tankClone().hull = tankTransactionItem.newItem;
      }
    } else {
      this.tankItemTransactionService.destroyTransaction();
    }
  }

  onBulletChange(index: number | null): void {
    if (this.tankItemTransactionService.transactionTankItemType === ETankItemType.Bullet) {
      const newBullet: ITankItem = this.tankItemTransactionService.transactionNewItem;
      const possibleIndex: number = this.tankClone().bullets.findIndex(
        bullet => bullet?.name === newBullet.name,
      );
      if (index === null) {
        index = this.tankClone().bullets.findIndex(bullet => !bullet);
        index = index >= 0 ? index : 0;
      }
      const actualIndex: number = possibleIndex >= 0 ? possibleIndex : index;
      const oldBullet: IBullet = this.tankClone().bullets[actualIndex];
      const tankTransactionItem: Readonly<ITankTransactionItem> =
        this.tankItemTransactionService.startTransaction(oldBullet, ETankTransactionTargets.Tank);
      if (tankTransactionItem) {
        switch (tankTransactionItem.host) {
          case ETankTransactionHosts.Inventory: {
            this.bulletActiveIndex = actualIndex;
            this.tankClone().bullets[actualIndex] = copy(tankTransactionItem.remainedItem) as IBullet;
            this.matTriggers()[actualIndex].openMenu();
            this.quantityMenus()[actualIndex].updateValidators(tankTransactionItem.newItem.quantity);
            break;
          }
          case ETankTransactionHosts.Tank: {
            this.tankClone().bullets = swap(this.tankClone().bullets, this.bulletActiveIndex, index);
            this.tankItemTransactionService.destroyTransaction();
            this.bulletActiveIndex = null;
            this.saveTank.emit(this.tankClone());
            break;
          }
        }
      }
    } else {
      this.bulletActiveIndex = null;
      this.tankItemTransactionService.destroyTransaction();
    }
  }

  onItemQuantityChange(quantityResult: IQuantityResult): void {
    if (!this.itemQuantityChanged && quantityResult.status) {
      this.itemQuantityChanged = true;
      const tank: IDemoTank = this.tankClone();
      const tankTransactionItem: Readonly<ITankTransactionItem> =
        this.tankItemTransactionService.fillTransaction(quantityResult.quantity);
      if (tankTransactionItem) {
        tank.bullets[this.bulletActiveIndex] = tankTransactionItem.newItem as IBullet;
      }
    }
    this.matTriggers()[this.bulletActiveIndex].closeMenu();
  }

  onMenuClosed(): void {
    if (!this.itemQuantityChanged) {
      this.saveTank.emit(this.tank());
    }
    this.itemQuantityChanged = false;
    this.bulletActiveIndex = null;
    this.tankItemTransactionService.destroyTransaction();
  }

  onBulletSlotDragStart(index: number, item: ITankItem): void {
    this.bulletActiveIndex = index;
    this.tankItemTransactionService.createTransaction(item, ETankTransactionHosts.Tank);
  }

  onBulletSlotDragEnd(): void {
    this.bulletActiveIndex = null;
    if (!this.tankItemTransactionService.transactionInProgress) {
      this.tankItemTransactionService.destroyTransaction();
    }
  }

  onBulletDoubleClick(index: number): void {
    const item = this.tankClone().bullets[index];
    this.tankItemTransactionService.createTransaction(item, ETankTransactionHosts.Tank);
    this.tankItemTransactionService.tankItemClicked$.next();
  }

  private observeInventoryItem(): void {
    this.tankItemTransactionService.inventoryItemClicked$.pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(() => {
      switch (this.tankItemTransactionService.transactionTankItemType) {
        case ETankItemType.TankTurret: {
          this.onTurretChange();
          break;
        }
        case ETankItemType.TankHull: {
          this.onHullChange();
          break;
        }
        case ETankItemType.Bullet: {
          this.onBulletChange(null);
          break;
        }
      }
    });
  }

  private observeTankInventoryTransactionReady(): void {
    this.tankItemTransactionService.tankInventoryTransactionReady$.pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(tankTransactionItem => {
      if (tankTransactionItem.newItem.itemType === ETankItemType.Bullet) {
        const updatedTankItems: ITankItem[] = this.tankItemTransactionService.handleTransactionCompletion(
          this.tankClone().bullets,
          tankTransactionItem,
        );
        this.tankClone().bullets = updatedTankItems as IBullet[];
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
      result ? this.saveTank.emit(this.tankClone()) : this.saveTank.emit(this.tank());
    });
  }
}
