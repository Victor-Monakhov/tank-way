import { ETeamNames } from '@victor_monakhov/tanks';

export const teamNamesDescription: { [key in ETeamNames]: string } = {
  [ETeamNames.Red]: 'Red Team',
  [ETeamNames.Blue]: 'Blue Team',
  [ETeamNames.Green]: 'Green Team',
};

export enum EStates {
  DemoPlayer = 'demoPlayer',
  DemoGame = 'demoGame',
  DemoBattles = 'demoBattles',
}

export enum ETankItemType {
  TankBody = 'tankBody',
  TankHead = 'tankHead',
  Bullet = 'bullet',
  Invention = 'invention',
}

export enum EInventionEffect {
  Booster,
  DestroyerMode,
  FattyTank,
}
