export interface ITankBody {
  name: string;
  path: string;
}

export interface ITankHead {
  name: string;
  path: string;
}

export interface ITankSettings {
  head: ITankHead;
  body: ITankBody;
}

export interface ITankStats extends ITankSettings {
  name: string;
  team: 'red' | 'blue';
  level: number;
  kills: number;
  deaths: number;
  date: number;
}
