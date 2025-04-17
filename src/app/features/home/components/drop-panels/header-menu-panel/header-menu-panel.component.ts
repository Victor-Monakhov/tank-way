import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {PanelService} from 'src/app/shared/services/panel-service/panel.service';

@Component({
    selector: 'app-header-menu-panel',
    templateUrl: './header-menu-panel.component.html',
    styleUrls: ['./header-menu-panel.component.scss'],
    standalone: false
})
export class HeaderMenuPanelComponent implements OnInit {

  public constructor(private panelService: PanelService) { }

  public ngOnInit(): void {
    return;
  }

  public triggerHandler(result: boolean, trigger: Subject<boolean>): void {
    this.panelService.triggerHandler(result, trigger);
  }

  public get headerMenuTrigger$(): BehaviorSubject<boolean> {
    return this.panelService.titleHeaderMenu$;
  }

}
