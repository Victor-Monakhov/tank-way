import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { EBreakPointsEnum } from './breakpoint.enum';
import { IBreakPointState } from './breakpoint.interface';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {

  private readonly breakPointObserver = inject(BreakpointObserver);

  public adjustedBreakPointObserver$: Observable<IBreakPointState> = this.breakPointObserver.observe([
    EBreakPointsEnum.Mobiles,
    EBreakPointsEnum.Tablets,
    EBreakPointsEnum.Laptops,
    EBreakPointsEnum.Desktop,
    EBreakPointsEnum.DesktopFHD,
  ]).pipe(
    map(state => ({
      mobile: state.breakpoints[EBreakPointsEnum.Mobiles],
      tablet: state.breakpoints[EBreakPointsEnum.Tablets],
      laptop: state.breakpoints[EBreakPointsEnum.Laptops],
      desktop: state.breakpoints[EBreakPointsEnum.Desktop],
      desktopFHD: state.breakpoints[EBreakPointsEnum.DesktopFHD],
    })),
  );
}
