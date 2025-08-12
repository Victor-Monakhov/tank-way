import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgScrollbarModule } from 'ngx-scrollbar';

import {
  TankDetailContainerComponent,
} from '../../../../../../common/elements/game-containers/tank-detail-container/tank-detail-container.component';
import {
  TankInventionsComponent,
} from '../../../../../../common/elements/game-containers/tank-inventory/tank-inventions.component';
import { TankViewComponent } from '../../../../../../common/elements/game-containers/tank-view/tank-view.component';
import { ETankItemType } from '../../../../../../common/resources/enums/game.enum';
import {
  IDemoTank,
  ITankItem,
} from '../../../../../../common/resources/interfaces/tank.interface';
import { InventoryService } from '../../../../services/inventory/inventory.service';

@Component({
  standalone: true,
  selector: 'tnm-tank-settings',
  imports: [
    NgScrollbarModule,
    MatButtonModule,
    MatIconModule,
    TankDetailContainerComponent,
    TankInventionsComponent,
    TankViewComponent,
  ],
  templateUrl: './tank-settings.component.html',
  styleUrl: './tank-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankSettingsComponent implements OnInit {

  private readonly inventoryService = inject(InventoryService);
  private readonly dr = inject(DestroyRef);

  tank = input.required<IDemoTank>();
  saveTank = output<IDemoTank>();

  ngOnInit(): void {
    this.observeInventoryItem();
  }

  onTankNameChange(name: string): void {
    const tank = this.tank();
    tank.name = name;
    this.saveTank.emit(tank);
  }

  onTankItemChange(gameItem?: ITankItem): void {
    if (this.inventoryService.isDragging) {
      const data = gameItem ? gameItem : this.inventoryService.inventoryDraggingData;
      const tank = this.tank();
      switch (data?.itemType) {
        case ETankItemType.TankTurret: {
          this.inventoryService.tankItemChanged$.next(tank.turret);
          tank.turret = data;
          break;
        }
        case ETankItemType.TankHull: {
          this.inventoryService.tankItemChanged$.next(tank.hull);
          tank.hull = data;
          break;
        }
      }
      this.saveTank.emit(tank);
    }
    this.inventoryService.isDragging = false;
  }

  private observeInventoryItem(): void {
    this.inventoryService.inventoryItemClicked$.pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(item => {
      this.inventoryService.isDragging = true;
      this.onTankItemChange(item);
    });
  }

}
