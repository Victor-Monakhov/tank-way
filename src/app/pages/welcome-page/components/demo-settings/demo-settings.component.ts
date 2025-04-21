import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { ELSKeys } from '../../../../common/resources/enums/local-storage.enum';
import { IPositionSettings } from '../../../../common/resources/interfaces/game.interface';
import { ITankSettings } from '../../../../common/resources/interfaces/tank.interface';
import { GameSettingsService } from '../../../../common/resources/services/game-settings/game-settings.service';
import { PositionSettingsComponent } from '../position-settings/position-settings.component';
import { TankSettingsComponent } from '../tank-settings/tank-settings.component';

@Component({
  standalone: true,
  selector: 'tnm-demo-settings',
  imports: [
    TankSettingsComponent,
    PositionSettingsComponent,
    MatButtonModule,
  ],
  templateUrl: './demo-settings.component.html',
  styleUrl: './demo-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoSettingsComponent implements OnInit {

  signInClick = output<void>();

  private readonly gameSettingsService = inject(GameSettingsService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (localStorage.getItem(ELSKeys.InDemo)) {
      localStorage.removeItem(ELSKeys.InDemo);
    }
  }

  onDemo(): void {
    this.router.navigate(['demo']).then();
  }

  onTankSettings(settings: ITankSettings): void {
    this.gameSettingsService.demoSettings.tankBody = settings.body.name;
    this.gameSettingsService.demoSettings.tankHead = settings.head.name;
  }

  onPositionSettings(settings: IPositionSettings): void {
    this.gameSettingsService.demoSettings.position = settings.position;
    this.gameSettingsService.demoSettings.team =
      settings.team.toLowerCase().includes('red') ? 'red' : 'blue';
  }

}
