import {ChangeDetectionStrategy, Component, model} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {EDemoTeams} from '../../../../common/auth/enums/game.enum';
import {ToggleBtnComponent} from '../../../../shared/components/toggle-btn/toggle-btn.component';
import {DemoSettingsPanelComponent} from '../demo-settings-panel/demo-settings-panel.component';

@Component({
  standalone: true,
  selector: 'tnm-position-settings',
  imports: [
    DemoSettingsPanelComponent,
    MatButtonToggleModule,
    ToggleBtnComponent,
    FormsModule,
  ],
  templateUrl: './position-settings.component.html',
  styleUrl: './position-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionSettingsComponent {

  readonly eDemoTeams = EDemoTeams;

  team = model<EDemoTeams>(EDemoTeams.Red);

  onTeamChanged(team: string): void {
    console.log(team);
  }
}
