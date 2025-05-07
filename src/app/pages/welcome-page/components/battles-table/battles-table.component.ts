import { DatePipe, NgClass, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  input,
  Renderer2,
  signal, viewChildren,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { IDemoBattle } from '../../../../common/resources/interfaces/game.interface';
import { IBreakPointState } from '../../../../shared/services/breakpoint/breakpoint.interface';
import { BreakpointService } from '../../../../shared/services/breakpoint/breakpoint.service';
import { EBattleStatsColumns } from '../../enums/user-statistics.enum';
import { MapBattlePipe } from '../../pipes/map-battle.pipe';
import {NgScrollbar} from "ngx-scrollbar";

@Component({
  standalone: true,
  selector: 'tnm-battles-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MapBattlePipe,
    NgOptimizedImage,
    DatePipe,
    NgClass,
    NgScrollbar,
  ],
  templateUrl: './battles-table.component.html',
  styleUrl: './battles-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattlesTableComponent {

  private readonly breakpointService = inject(BreakpointService);
  private readonly renderer = inject(Renderer2);
  private readonly injector = inject(Injector);

  expandedEl = viewChildren<ElementRef<HTMLElement>>('expandedEl');

  breakpoint = toSignal<IBreakPointState>(
    this.breakpointService.adjustedBreakPointObserver$, { injector: this.injector },
  );

  isLargeScreen = computed<boolean>(
    () => this.breakpoint().laptop || this.breakpoint().desktop || this.breakpoint().desktopFHD,
  );

  battles = input.required<IDemoBattle[]>();

  readonly eBattleStatsColumns = EBattleStatsColumns;

  readonly columnsToDisplay: EBattleStatsColumns[] = [
    EBattleStatsColumns.Id,
    EBattleStatsColumns.Name,
    EBattleStatsColumns.Tank,
    EBattleStatsColumns.Team,
    EBattleStatsColumns.Level,
    EBattleStatsColumns.Kills,
    EBattleStatsColumns.Deaths,
    EBattleStatsColumns.Date,
  ];

  columnsToDisplayWithExpand: string[] = [...this.columnsToDisplay, 'expand'];

  expandedElement = signal<IDemoBattle | null>(null);

  public toggle(element: IDemoBattle, index: number): void {
    this.expandedElement.set(this.expandedElement()?.id === element.id ? null : element);
    this.expandedEl().forEach((elRef: ElementRef<HTMLElement>, i: number) => {
      const el = elRef.nativeElement;
      if (index === i && this.expandedElement()?.id === element.id) {
        this.renderer.setStyle(el, 'height', `${el.scrollHeight}px`);
      } else {
        this.renderer.setStyle(el, 'height', `0px`);
      }
    });
  }
}
