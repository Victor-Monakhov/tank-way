import {Directive, ElementRef, Input, Optional} from '@angular/core';
import {MenuComponent} from "../components/menu/menu.component";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {merge, Observable} from "rxjs";
import {ComponentPortal} from "@angular/cdk/portal";
import { IDropModal } from '../interfaces/drop-menu.interface';

@Directive({
  selector: '[dropModal]',
  host: {
    "(click)": "onDrop()",
  },
})
export class DropModalDirective {

  @Input() public dropModal: IDropModal;
  @Input() public message: string;
  private closeHandler;

  constructor(public overlay: Overlay,
              public elementRef: ElementRef,
              @Optional() public overlayRef: OverlayRef) {
  }

  public onDrop(){
    this.openMenu();
    this.dropModal.anim = true;
    this.dropModal.message.next(this.message);
  }

  private openMenu(){
    this.dropModal.visible = true;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
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
    const closeMenu = this.dropModal.closed
    return  merge(backdropClick$, detachment$, closeMenu);
  }

  private destroyMenu(){
    if (!this.overlayRef) {
      return;
    }
    this.dropModal.anim = false;
    this.closeHandler.unsubscribe();
    this.overlayRef.detach();
  }
}
