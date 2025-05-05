import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { ELSKeys } from '../../../../common/resources/enums/local-storage.enum';
import { StateService } from '../../../../common/resources/services/state/state.service';
import { PositionSettingsComponent } from '../position-settings/position-settings.component';
import { TankSettingsComponent } from '../tank-settings/tank-settings.component';
import { UserStatisticsComponent } from '../user-statistics/user-statistics.component';

@Component({
  standalone: true,
  selector: 'tnm-demo-settings',
  imports: [
    TankSettingsComponent,
    PositionSettingsComponent,
    MatButtonModule,
    UserStatisticsComponent,
  ],
  templateUrl: './demo-settings.component.html',
  styleUrl: './demo-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoSettingsComponent implements OnInit {

  signInClick = output<void>();

  private readonly stateService = inject(StateService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (localStorage.getItem(ELSKeys.InDemo)) {
      localStorage.removeItem(ELSKeys.InDemo);
    }
  }

  onDemo(): void {
    this.router.navigate(['demo']).then();
  }

}
