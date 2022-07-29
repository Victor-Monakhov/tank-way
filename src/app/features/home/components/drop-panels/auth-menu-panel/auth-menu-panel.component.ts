import {Component, OnInit} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PanelService } from 'src/app/shared/services/panel-service/panel.service';

@Component({
  selector: 'app-auth-menu-panel',
  templateUrl: './auth-menu-panel.component.html',
  styleUrls: ['./auth-menu-panel.component.scss']
})
export class AuthMenuPanelComponent implements OnInit {

  public constructor(private panelService: PanelService) { }

  public ngOnInit(): void {
  }

  public triggerHandler(result: boolean, trigger: Subject<boolean>): void {
    this.panelService.triggerHandler(result, trigger);
  }

  public get authMenuTrigger$(): BehaviorSubject<boolean> {
    return this.panelService.authMenu$;
  }

}
