import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import {
  GameItemBtnComponent,
} from '../../../../../../common/elements/game-buttons/game-item-btn/game-item-btn.component';
import { IDemoGame } from '../../../../../../common/resources/interfaces/game.interface';
import { IDemoTank } from '../../../../../../common/resources/interfaces/tank.interface';

@Component({
  selector: 'tnm-tank-list',
  imports: [
    GameItemBtnComponent,
  ],
  templateUrl: './tank-list.component.html',
  styleUrl: './tank-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankListComponent {

  tanks = input.required<IDemoTank[]>();
  game = input.required<Partial<IDemoGame>>();
  buyTank = output<IDemoTank>();
  selectTank = output<number>();

  onBuyTank(tank: IDemoTank): void {
    this.buyTank.emit(tank);
  }

  onSelectTank(index: number): void {
    this.selectTank.emit(index);
  }
}
