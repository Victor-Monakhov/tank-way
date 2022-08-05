import {Component, OnInit} from '@angular/core';
import {PanelService} from "../../../../../shared/services/panel-service/panel.service";

@Component({
  selector: 'app-auth-code',
  templateUrl: './auth-code.component.html',
  styleUrls: ['./auth-code.component.scss']
})
export class AuthCodeComponent implements OnInit {

  public isWaiting: boolean = false;
  public readonly capacity: number = 6;

  public constructor(private panelService: PanelService) {
  }

  public ngOnInit(): void {
    return;
  }

  public onBack(): void {
    this.panelService.authCode$.next(false);
    this.panelService.signUp$.next(true);
  }

  public codeHandler(code: string): void {

  }

}
