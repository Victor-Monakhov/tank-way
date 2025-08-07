import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'tnm-demo-settings-panel',
  imports: [],
  templateUrl: './demo-settings-panel.component.html',
  styleUrl: './demo-settings-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoSettingsPanelComponent {
  title = input<string>();

  @HostBinding('attr.title') attrTitle = null;
}
