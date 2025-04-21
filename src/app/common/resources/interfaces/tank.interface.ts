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
