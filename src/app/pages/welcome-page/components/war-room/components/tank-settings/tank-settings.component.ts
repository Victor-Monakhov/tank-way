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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

import { NgScrollbarModule } from 'ngx-scrollbar';

import {
  QuantityMenuComponent,
} from '../../../../../../common/elements/game-containers/quantity-menu/quantity-menu.component';
import {
  TankInventionsComponent,
} from '../../../../../../common/elements/game-containers/tank-inventory/tank-inventions.component';
import {
  TankItemSlotComponent,
} from '../../../../../../common/elements/game-containers/tank-item-slot/tank-item-slot.component';
import { TankViewComponent } from '../../../../../../common/elements/game-containers/tank-view/tank-view.component';
import { ETankItemType, ETankTransactionTargets } from '../../../../../../common/resources/enums/game.enum';
import { IQuantityResult } from '../../../../../../common/resources/interfaces/game.interface';
import {
  IBullet,
  IDemoTank,
  ITankItem,
  ITankTransactionItem,
} from '../../../../../../common/resources/interfaces/tank.interface';
import { copy } from '../../../../../../shared/constants/utils';
import { TankItemTransactionService } from '../../../../services/tank-item-transaction/tank-item-transaction.service';

@Component({
  standalone: true,
  selector: 'tnm-tank-settings',
  imports: [
    NgScrollbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TankItemSlotComponent,
    TankInventionsComponent,
    TankViewComponent,
    QuantityMenuComponent,
  ],
  templateUrl: './tank-settings.component.html',
  styleUrl: './tank-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankSettingsComponent implements OnInit {

  private readonly tankItemTransactionService = inject(TankItemTransactionService);
  private readonly dr = inject(DestroyRef);

  private itemQuantityChanged = false;
  private bulletActiveIndex: number | null = null;

  tank = input.required<IDemoTank>();
  saveTank = output<IDemoTank>();
  matTriggers = viewChildren(MatMenuTrigger);
  quantityMenus = viewChildren(QuantityMenuComponent);

  bullets = computed<IBullet[]>(() => copy(this.tank()?.bullets ?? []));

  ngOnInit(): void {
    this.observeInventoryItem();
  }

  onTankNameChange(name: string): void {
    const tank = this.tank();
    tank.name = name;
    this.saveTank.emit(tank);
  }

  onTurretChange(): void {
    if (this.tankItemTransactionService.transactionTankItemType === ETankItemType.TankTurret) {
      const tank = this.tank();
      this.tankItemTransactionService.startTransaction(tank.turret, ETankTransactionTargets.Tank);
      const tankTransactionItem: Readonly<ITankTransactionItem> =
        this.tankItemTransactionService.finishTransaction(1, true);
      if (tankTransactionItem) {
        tank.turret = tankTransactionItem.newItem;
        this.saveTank.emit(tank);
      }
    } else {
      this.tankItemTransactionService.destroyTransaction();
    }
  }

  onHullChange(): void {
    if (this.tankItemTransactionService.transactionTankItemType === ETankItemType.TankHull) {
      const tank = this.tank();
      this.tankItemTransactionService.startTransaction(tank.hull, ETankTransactionTargets.Tank);
      const tankTransactionItem: Readonly<ITankTransactionItem> =
        this.tankItemTransactionService.finishTransaction(1, true);
      if (tankTransactionItem) {
        tank.hull = tankTransactionItem.newItem;
        this.saveTank.emit(tank);
      }
    } else {
      this.tankItemTransactionService.destroyTransaction();
    }
  }

  onBulletChange(index: number): void {
    if (this.tankItemTransactionService.transactionTankItemType === ETankItemType.Bullet) {
      const oldBullet = this.tank().bullets[index];
      const tankTransactionItem: Readonly<ITankTransactionItem> =
        this.tankItemTransactionService.startTransaction(oldBullet, ETankTransactionTargets.Tank);
      console.log(tankTransactionItem);
      if (tankTransactionItem) {
        this.bulletActiveIndex = index;
        this.bullets()[index] = copy(tankTransactionItem.remainedItem) as IBullet;
        this.matTriggers()[index].openMenu();
        this.quantityMenus()[index].updateValidators(tankTransactionItem.newItem.quantity);
      }
    } else {
      this.bulletActiveIndex = null;
      this.tankItemTransactionService.destroyTransaction();
    }
  }

  onItemQuantityChange(quantityResult: IQuantityResult): void {
    if (!this.itemQuantityChanged && quantityResult.status) {
      this.itemQuantityChanged = true;
      const tank: IDemoTank = this.tank();
      const tankTransactionItem: Readonly<ITankTransactionItem> =
        this.tankItemTransactionService.finishTransaction(quantityResult.quantity);
      if (tankTransactionItem) {
        tank.bullets[this.bulletActiveIndex] = tankTransactionItem.newItem as IBullet;
        this.bullets()[this.bulletActiveIndex] = copy(this.tank().bullets[this.bulletActiveIndex]) as IBullet;
        this.saveTank.emit(tank);
      }
    }
    this.matTriggers()[this.bulletActiveIndex].closeMenu();
  }

  onMenuClosed(): void {
    if (!this.itemQuantityChanged) {
      this.bullets()[this.bulletActiveIndex] = this.tank().bullets[this.bulletActiveIndex] as IBullet;
    }
    this.itemQuantityChanged = false;
    this.bulletActiveIndex = null;
    this.tankItemTransactionService.destroyTransaction();
  }

  onBulletSlotDragStart(index: number, item: ITankItem): void {
    this.bulletActiveIndex = index;
    //todo
    // this.tankItemTransactionService.inventoryDraggingData = item;
  }

  onBulletSlotDragEnd(): void {
    this.bulletActiveIndex = null;
    //todo
    // this.tankItemTransactionService.inventoryDraggingData = null;
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
      }
    });
  }
}
