import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';

import { ETeamNames } from '../../../../common/resources/enums/game.enum';
import { IPositionSettings } from '../../../../common/resources/interfaces/game.interface';
import { ToggleBtnComponent } from '../../../../shared/components/toggle-btn/toggle-btn.component';
import { DemoSettingsPanelComponent } from '../demo-settings-panel/demo-settings-panel.component';

@Component({
  standalone: true,
  selector: 'tnm-position-settings',
  imports: [
    DemoSettingsPanelComponent,
    MatButtonToggleModule,
    MatRadioModule,
    ToggleBtnComponent,
    FormsModule,
    NgClass,
    NgOptimizedImage,
  ],
  templateUrl: './position-settings.component.html',
  styleUrl: './position-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionSettingsComponent {

  readonly eDemoTeams = ETeamNames;

  positionSettings = output<IPositionSettings>();

  team = model<ETeamNames>(ETeamNames.Red);
  position = model<number>(1);

  readonly positions = [1, 2, 3, 4];

  onChanges(): void {
    this.positionSettings.emit({
      team: this.team(),
      position: this.position(),
    });
  }
}
