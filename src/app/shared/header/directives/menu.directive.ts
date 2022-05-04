import {Directive, ElementRef, Input, Optional} from '@angular/core';
import {MenuComponent} from "../components/menu/menu.component";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {merge, Observable} from "rxjs";
import {ComponentPortal, TemplatePortal} from "@angular/cdk/portal";
import { DropMenu } from '../interfaces/drop-menu.interface';

@Directive({
  selector: '[appDropMenu]',
  host: {
    "(click)": "toggleDropdown()",
  },
})
export class MenuDirective {

  @Input() public appDropMenu: DropMenu;
  @Input() public message: string;
  private closeHandler;

  constructor(public overlay: Overlay,
              public elementRef: ElementRef,
              @Optional() public overlayRef: OverlayRef) {
  }

  public toggleDropdown(){
    this.openMenu();
    this.appDropMenu.anim = true;
    this.appDropMenu.message = this.message;
  }

  private openMenu(){
    this.appDropMenu.visible = true;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      //scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: "end",
            originY: "bottom",
            overlayX: "end",
            overlayY: "top"
          }
        ])
    });
    const componentPortal = new ComponentPortal(MenuComponent);
    this.overlayRef.attach(componentPortal);
    this.closeHandler = this.dropdownClosingActions().subscribe(
      () =>this.destroyMenu()
    );
  }

  private dropdownClosingActions(): Observable<MouseEvent | void> {
    const backdropClick$ = this.overlayRef.backdropClick();
    const detachment$ = this.overlayRef.detachments();
    const closeMenu = this.appDropMenu.closed
    return  merge(backdropClick$, detachment$, closeMenu);
  }

  private destroyMenu(){
    if (!this.overlayRef) {
      return;
    }
    this.appDropMenu.anim = false;
    this.closeHandler.unsubscribe();
    this.overlayRef.detach();
  }
}
