import { Pipe, PipeTransform } from '@angular/core';

import { ITankStats } from '../../../common/resources/interfaces/tank.interface';
import { EBattleStatsColumns } from '../enums/user-statistics.enum';

@Pipe({
  name: 'mapBattle',
})
export class MapBattlePipe implements PipeTransform {

  transform(
    unit: ITankStats,
    column: EBattleStatsColumns,
  ): Partial< { value: string | number; body: string; head: string }> {
    switch (column) {
      case EBattleStatsColumns.Tank:
        return {
          body: unit.body.path,
          head: unit.head.path,
        };
      case EBattleStatsColumns.Name:
        return { value: unit.name };
      case EBattleStatsColumns.Team:
        return { value: unit.team };
      case EBattleStatsColumns.Level:
        return { value: unit.level };
      case EBattleStatsColumns.Kills:
        return { value: unit.kills };
      case EBattleStatsColumns.Deaths:
        return { value: unit.deaths };
      case EBattleStatsColumns.Date:
        return { value: unit.date };
      default:
        return { value: '' };
    }
  }

}
