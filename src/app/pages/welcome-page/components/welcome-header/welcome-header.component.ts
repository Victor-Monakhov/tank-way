import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, model, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { TranslatePipe } from '@ngx-translate/core';

import { map } from 'rxjs';

import { StateService } from '../../../../common/resources/services/state/state.service';
import { BurgerBtnComponent } from '../../../../shared/components/burger-btn/burger-btn.component';
import { SelectLanguageComponent } from '../../../../shared/components/select-language/select-language.component';
import { BreakpointService } from '../../../../shared/services/breakpoint/breakpoint.service';

@Component({
  standalone: true,
  selector: 'tnm-welcome-header',
  imports: [
    NgOptimizedImage,
    TranslatePipe,
    SelectLanguageComponent,

    MatToolbarModule,
    MatButtonModule,
    BurgerBtnComponent,
  ],
  templateUrl: './welcome-header.component.html',
  styleUrl: './welcome-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeHeaderComponent {

  // Todo temporary for demo versions
  private readonly stateService = inject(StateService);
  private readonly breakpointService = inject(BreakpointService);

  isSmallScreen = toSignal(this.breakpointService.adjustedBreakPointObserver$.pipe(
    map(state => state.mobile || state.tablet),
  ));

  burgerState = model<boolean>();

  signInClick = output<void>();
  burgerClick = output<boolean>();

  onSignInBtnClick(): void {
    this.signInClick.emit();
  }

  // Todo temporary for demo versions
  onRefreshPage(): void {
    this.stateService.refreshStates();
    setTimeout(() => location.reload(), 300);
  }
}
