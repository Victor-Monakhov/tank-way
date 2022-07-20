import {Component, OnInit} from '@angular/core';
import {PanelService} from '../../../../../shared/services/panel-service/panel.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  public constructor(private panelService: PanelService) {
  }

  public ngOnInit(): void {
    return;
  }

  public onClose(): void {
    this.panelService.titleHeaderMenu$.next(false);
  }

}
