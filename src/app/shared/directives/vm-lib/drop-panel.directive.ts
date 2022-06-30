import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {IDropPanel} from '../../interfaces/drop-panel.interface';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {merge, Observable} from 'rxjs';
import {SubSink} from 'subsink';

@Directive({
  selector: '[vmdDropPanel]'
})
export class DropPanelDirective implements OnChanges {

  @Input() public vmdDropPanel: IDropPanel;
  @Input() public trigger: boolean = false;
  @Input() public staticBackdrop: boolean = true;
  @Input() public hasBackdrop: boolean = true;
  @Input() public animDaley: number = 0;
  @Input() public backdropClass: string = 'backdrop-blackA05';
  @Output() public triggerEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  private subs: SubSink = new SubSink();

  public constructor(public overlay: Overlay,
                     public elementRef: ElementRef<HTMLElement>,
                     public viewContainerRef: ViewContainerRef,
                     @Optional() public overlayRef: OverlayRef) {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['trigger'] &&
      changes['trigger'].previousValue !== changes['trigger'].currentValue) {
      (this.trigger) ? this.onDrop() : this.destroyMenu();
    }
  }

  private onDrop(): void {
    this.openMenu();
  }

  private openMenu(): void {
    this.vmdDropPanel.visible.next(true);
    this.overlayRef = this.overlay.create({
      hasBackdrop: this.hasBackdrop,
      backdropClass: this.backdropClass,
      width: this.elementRef.nativeElement.clientWidth,
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top'
          }
        ]),
      scrollStrategy: this.overlay.scrollStrategies.block()
    });
    const templatePortal = new TemplatePortal(
      this.vmdDropPanel.templateRef as TemplateRef<any>,
      this.viewContainerRef
    );
    this.overlayRef.attach(templatePortal);
    this.subs.add(
      this.dropdownClosingActions().subscribe(
        () => this.destroyMenu()
      )
    );
  }

  private dropdownClosingActions(): Observable<MouseEvent | void> {
    const backdropClick$ = this.overlayRef.backdropClick();
    const detachment$ = this.overlayRef.detachments();
    const closeMenu$ = this.vmdDropPanel.closed;
    if (this.staticBackdrop) {
      return merge(detachment$, closeMenu$);
    }
    return merge(backdropClick$, detachment$, closeMenu$);
  }

  private destroyMenu(): void {
    if (!this.overlayRef) {
      return;
    }
    setTimeout(() => {
      this.triggerEvent.emit(false);
      this.subs.unsubscribe();
      this.overlayRef.detach();
      this.vmdDropPanel.visible.next(false);
    }, this.animDaley);
  }
}
