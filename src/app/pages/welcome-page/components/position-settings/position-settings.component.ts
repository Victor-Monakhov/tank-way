import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';

import { teamNamesDescription } from '../../../../common/resources/enums/game.enum';
import { IDemoGame } from '../../../../common/resources/interfaces/game.interface';
import { IDemoTank } from '../../../../common/resources/interfaces/tank.interface';
import { StateService } from '../../../../common/resources/services/state/state.service';
import { ToggleBtnComponent } from '../../../../shared/components/toggle-btn/toggle-btn.component';
import { DemoSettingsPanelComponent } from '../demo-settings-panel/demo-settings-panel.component';

import { ETeamNames } from '@victor_monakhov/tanks';

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

  private readonly stateService = inject(StateService);

  private game!: IDemoGame;
  private tank!: IDemoTank;

  readonly eDemoTeams = ETeamNames;
  readonly teamNamesDescription: { [key in ETeamNames]: string } = teamNamesDescription;

  readonly positions = [1, 2, 3, 4];

  team = model<string>(this.teamNamesDescription[ETeamNames.Red]);
  position = model<number>(1);

  constructor() {
    effect(() => {
      this.game = this.stateService.demoGame();
      if (this.game) {
        this.tank = this.game.tanks.find(item => item.chosenAsPlayer);
        if (this.tank) {
          this.team.set(this.teamNamesDescription[this.tank.position.team]);
          this.position.set(this.tank.position.position + 1);
        }
      }
    });
  }

  onChanges(): void {
    this.tank.position.team = Object
      .entries(this.teamNamesDescription)
      .find(([key, value]: [ETeamNames, string]) => this.team() === value)[0] as ETeamNames;
    this.tank.position.position = this.position() - 1;
    this.stateService.updateDemoGameState(this.game);
  }
}
