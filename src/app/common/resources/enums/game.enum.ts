export enum ETeamNames {
  Red = 'red',
  Blue = 'blue',
}

export const teamNamesDescription: { [key in ETeamNames]: string } = {
  [ETeamNames.Red]: 'Red Team',
  [ETeamNames.Blue]: 'Blue Team',
};
