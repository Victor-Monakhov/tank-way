import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { TranslatePipe } from '@ngx-translate/core';

import { StateService } from '../../../../common/resources/services/state/state.service';
import { SelectLanguageComponent } from '../../../../shared/components/select-language/select-language.component';

@Component({
  standalone: true,
  selector: 'tnm-welcome-header',
  imports: [
    NgOptimizedImage,
    TranslatePipe,
    SelectLanguageComponent,

    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './welcome-header.component.html',
  styleUrl: './welcome-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeHeaderComponent {

  // Todo temporary for demo versions
  private readonly stateService = inject(StateService);

  signInClick = output<void>();

  onSignInBtnClick(): void {
    this.signInClick.emit();
  }

  onRefreshPage(): void {
    this.stateService.refreshStates();
  }
}
