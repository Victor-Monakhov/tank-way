import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output, viewChildren,
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
  TankDetailContainerComponent,
} from '../../../../../../common/elements/game-containers/tank-detail-container/tank-detail-container.component';
import {
  TankInventionsComponent,
} from '../../../../../../common/elements/game-containers/tank-inventory/tank-inventions.component';
import { TankViewComponent } from '../../../../../../common/elements/game-containers/tank-view/tank-view.component';
import { tankDefaultTransactionItem } from '../../../../../../common/resources/constants/tank-settings';
import { ETankItemType } from '../../../../../../common/resources/enums/game.enum';
import { IQuantityResult } from '../../../../../../common/resources/interfaces/game.interface';
import {
  IBullet,
  IDemoTank,
  ITankItem,
  ITankTransactionItem,
} from '../../../../../../common/resources/interfaces/tank.interface';
import { InventoryService } from '../../../../services/inventory/inventory.service';

@Component({
  standalone: true,
  selector: 'tnm-tank-settings',
  imports: [
    NgScrollbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TankDetailContainerComponent,
    TankInventionsComponent,
    TankViewComponent,
    QuantityMenuComponent,
  ],
  templateUrl: './tank-settings.component.html',
  styleUrl: './tank-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankSettingsComponent implements OnInit {

  private readonly inventoryService = inject(InventoryService);
  private readonly dr = inject(DestroyRef);

  private itemQuantityChanged = false;
  private tankTransactionItem: Readonly<ITankTransactionItem> = tankDefaultTransactionItem;

  tank = input.required<IDemoTank>();
  saveTank = output<IDemoTank>();
  matTriggers = viewChildren(MatMenuTrigger);
  quantityMenus = viewChildren(QuantityMenuComponent);

  ngOnInit(): void {
    this.observeInventoryItem();
  }

  onTankNameChange(name: string): void {
    const tank = this.tank();
    tank.name = name;
    this.saveTank.emit(tank);
  }

  onTurretChange(item?: ITankItem): void {
    const turret = item ? item : this.inventoryService.inventoryDraggingData;
    if (turret?.itemType === ETankItemType.TankTurret) {
      const tank = this.tank();
      this.inventoryService.startTransaction(tank.turret, turret);
      this.tankTransactionItem = this.inventoryService.finishTransaction(1, true);
      if (this.tankTransactionItem) {
        tank.turret = this.tankTransactionItem.newItem;
        this.inventoryService.tankTransactionComplete$.next(this.tankTransactionItem);
        this.saveTank.emit(tank);
      }
    }
    this.tankTransactionItem = tankDefaultTransactionItem;
    this.inventoryService.inventoryDraggingData = null;
    this.inventoryService.isDragging = false;
  }

  onHullChange(item?: ITankItem): void {
    const hull = item ? item : this.inventoryService.inventoryDraggingData;
    if (hull?.itemType === ETankItemType.TankHull) {
      const tank = this.tank();
      this.inventoryService.startTransaction(tank.hull, hull);
      this.tankTransactionItem = this.inventoryService.finishTransaction(1, true);
      if (this.tankTransactionItem) {
        tank.hull = this.tankTransactionItem.newItem;
        this.inventoryService.tankTransactionComplete$.next(this.tankTransactionItem);
        this.saveTank.emit(tank);
      }
    }
    this.tankTransactionItem = tankDefaultTransactionItem;
    this.inventoryService.inventoryDraggingData = null;
    this.inventoryService.isDragging = false;
  }

  onBulletChange(index: number, item?: ITankItem): void {
    const bullet = item ? item : this.inventoryService.inventoryDraggingData;
    if (bullet?.itemType === ETankItemType.Bullet) {
      const oldBullet = this.tank().bullets[index];
      this.tankTransactionItem = this.inventoryService.startTransaction(oldBullet, bullet, index);
      this.tank().bullets[index] = this.tankTransactionItem.remainedItem as IBullet;
      this.matTriggers()[index].openMenu();
      this.quantityMenus()[index].updateValidators(this.tankTransactionItem.newItem.quantity);
    }
  }

  onItemQuantityChange(quantityResult: IQuantityResult): void {
    if (!this.itemQuantityChanged && quantityResult.status) {
      this.itemQuantityChanged = true;
      const tank = this.tank();
      this.tankTransactionItem = this.inventoryService.finishTransaction(quantityResult.quantity);
      if (this.tankTransactionItem) {
        tank.bullets[this.tankTransactionItem.cellIndex] = this.tankTransactionItem.newItem as IBullet;
        this.inventoryService.tankTransactionComplete$.next(this.tankTransactionItem);
        this.saveTank.emit(tank);
      }
    }
    this.matTriggers().forEach(trigger => trigger.closeMenu());
  }

  onMenuClosed(): void {
    if (!this.itemQuantityChanged) {
      const tank = this.tank();
      tank.bullets[this.tankTransactionItem.cellIndex] = this.tankTransactionItem.oldItem as IBullet;
      this.inventoryService.finishTransaction(0);
    }
    this.tankTransactionItem = tankDefaultTransactionItem;
    this.itemQuantityChanged = false;
    this.inventoryService.inventoryDraggingData = null;
    this.inventoryService.isDragging = false;
  }

  private observeInventoryItem(): void {
    this.inventoryService.inventoryItemClicked$.pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(item => {
      this.inventoryService.isDragging = true;
      switch (item?.itemType) {
        case ETankItemType.TankTurret: {
          this.onTurretChange(item);
          break;
        }
        case ETankItemType.TankHull: {
          this.onHullChange(item);
          break;
        }
      }
    });
  }
}
