import {Directive, ElementRef, Input, Optional, TemplateRef, ViewContainerRef} from '@angular/core';
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {merge, Observable} from "rxjs";
import {TemplatePortal} from "@angular/cdk/portal";
import { IDropModal } from '../interfaces/drop-modal.interface';

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
              public viewContainerRef: ViewContainerRef,
              @Optional() public overlayRef: OverlayRef) {
  }

  public onDrop() {
    this.openMenu();
    this.dropModal.anim = true;
  }

  private openMenu() {
    this.dropModal.visible.next(true);
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
    const templatePortal = new TemplatePortal(
      this.dropModal.templateRef as TemplateRef<any>,
      this.viewContainerRef
    );
    this.overlayRef.attach(templatePortal);
    this.closeHandler = this.dropdownClosingActions().subscribe(
      () => this.destroyMenu()
    );
  }

  private dropdownClosingActions(): Observable<MouseEvent | void> {
    const backdropClick$ = this.overlayRef.backdropClick();
    const detachment$ = this.overlayRef.detachments();
    const closeMenu = this.dropModal.closed
    return merge(backdropClick$, detachment$, closeMenu);
  }

  private destroyMenu() {
    if (!this.overlayRef) {
      return;
    }
    this.dropModal.anim = false;
    setTimeout(() => {
      this.closeHandler.unsubscribe();
      this.overlayRef.detach();
      this.dropModal.visible.next(false);
    }, 500);
  }
}
