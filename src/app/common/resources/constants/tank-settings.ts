import { ETankItemType } from '../enums/game.enum';
import { ITankBody, ITankHead } from '../interfaces/tank.interface';


export const tankBodies: ITankBody[] = [
  { name: 'T_1', itemType: ETankItemType.TankBody, path: 'assets/images/tanks/T_1.png' },
  { name: 'T_2', itemType: ETankItemType.TankBody, path: 'assets/images/tanks/T_2.png' },
  { name: 'T_3', itemType: ETankItemType.TankBody, path: 'assets/images/tanks/T_3.png' },
  { name: 'T_4', itemType: ETankItemType.TankBody, path: 'assets/images/tanks/T_4.png' },
];

export const tankHeads: ITankHead[] = [
  { name: 'gun_1', itemType: ETankItemType.TankHead, path: 'assets/images/tanks/gun_1.png' },
  { name: 'gun_2', itemType: ETankItemType.TankHead, path: 'assets/images/tanks/gun_2.png' },
  { name: 'gun_3', itemType: ETankItemType.TankHead, path: 'assets/images/tanks/gun_3.png' },
  { name: 'gun_4', itemType: ETankItemType.TankHead, path: 'assets/images/tanks/gun_4.png' },
  { name: 'gun_5', itemType: ETankItemType.TankHead, path: 'assets/images/tanks/gun_5.png' },
];
