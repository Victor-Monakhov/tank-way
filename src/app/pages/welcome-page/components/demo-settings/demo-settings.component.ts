import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { StateService } from '../../../../common/resources/services/state/state.service';
import { PositionSettingsComponent } from '../position-settings/position-settings.component';
import { WarRoomComponent } from '../war-room/war-room.component';

@Component({
  standalone: true,
  selector: 'tnm-demo-settings',
  imports: [
    PositionSettingsComponent,
    MatButtonModule,
    WarRoomComponent,
  ],
  templateUrl: './demo-settings.component.html',
  styleUrl: './demo-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoSettingsComponent implements OnInit {

  signInClick = output<void>();

  private readonly router = inject(Router);
  private readonly stateService = inject(StateService);

  ngOnInit(): void {
    this.stateService.inDemo = false;
  }

  onDemo(): void {
    this.stateService.inDemo = true;
    this.router.navigate(['demo']).then();
  }

}
