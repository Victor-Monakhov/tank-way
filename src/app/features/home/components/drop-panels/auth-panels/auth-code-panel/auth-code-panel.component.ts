import {Component, OnInit} from '@angular/core';
import {PanelService} from '../../../../../../shared/services/panel-service/panel.service';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-auth-code-panel',
  templateUrl: './auth-code-panel.component.html',
  styleUrls: ['./auth-code-panel.component.scss']
})
export class AuthCodePanelComponent implements OnInit {

  public constructor(private panelService: PanelService) { }

  public ngOnInit(): void {
    return;
  }

  public triggerHandler(result: boolean, trigger: Subject<boolean>): void {
    this.panelService.triggerHandler(result, trigger);
  }

  public get authCodeTrigger$(): BehaviorSubject<boolean> {
    return this.panelService.authCode$;
  }
}
