import {Component, OnDestroy, OnInit} from '@angular/core';
import {PanelService} from '../../../../../shared/services/panel-service/panel.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SubSink} from 'subsink';
import {WIN_SIZES} from '../../../../../app.config';

@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.scss'],
    standalone: false
})
export class HeaderMenuComponent implements OnInit, OnDestroy {

  private subs: SubSink = new SubSink();

  public constructor(private panelService: PanelService,
                     private bpObserver: BreakpointObserver) {
    this.subs.add(
      bpObserver
        .observe([`(min-width: ${WIN_SIZES.MD}px)`])
        .subscribe(() => {
          this.onClose();
        })
    );
  }

  public ngOnInit(): void {
    return;
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onClose(): void {
    this.panelService.titleHeaderMenu$.next(false);
  }

  public onAuthMenu(): void {
    this.onClose();
    this.panelService.authMenu$.next(true);
  }
}
