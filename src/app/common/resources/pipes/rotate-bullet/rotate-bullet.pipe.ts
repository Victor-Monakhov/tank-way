import { Pipe, PipeTransform } from '@angular/core';

import { ETankItemType } from '../../enums/game.enum';
import { ITankItem } from '../../interfaces/tank.interface';

@Pipe({
  name: 'rotateBullet',
})
export class RotateBulletPipe implements PipeTransform {

  transform(value: ITankItem): string {
    return value?.itemType === ETankItemType.Bullet ? `rotate(60deg)` : `rotate(0deg)`;
  }

}
