import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {PanelService} from '../../../../../../shared/services/panel-service/panel.service';

@Component({
    selector: 'app-sign-up-panel',
    templateUrl: './sign-up-panel.component.html',
    styleUrls: ['./sign-up-panel.component.scss'],
    standalone: false
})
export class SignUpPanelComponent implements OnInit {

  public constructor(private panelService: PanelService) { }

  public ngOnInit(): void {
    return;
  }

  public triggerHandler(result: boolean, trigger: Subject<boolean>): void {
    this.panelService.triggerHandler(result, trigger);
  }

  public get signUpTrigger$(): BehaviorSubject<boolean> {
    return this.panelService.signUp$;
  }

}
