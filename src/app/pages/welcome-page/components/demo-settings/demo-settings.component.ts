import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TankSettingsComponent} from "../tank-settings/tank-settings.component";
import {PositionSettingsComponent} from "../position-settings/position-settings.component";

@Component({
  standalone: true,
  selector: 'tnm-demo-settings',
  imports: [
    TankSettingsComponent,
    PositionSettingsComponent
  ],
  templateUrl: './demo-settings.component.html',
  styleUrl: './demo-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoSettingsComponent {

}
