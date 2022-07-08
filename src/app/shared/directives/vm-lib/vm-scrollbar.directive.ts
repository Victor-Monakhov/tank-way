import {AfterViewChecked, AfterViewInit, Directive, ElementRef, HostListener, Input} from '@angular/core';
import {VmScrollbarComponent} from '../../components/vm-lib/scrollbar/vm-scrollbar.component';

@Directive({
  selector: '[vmdScrollbar]'
})
export class VmScrollbarDirective implements AfterViewInit, AfterViewChecked {

  @Input() public vmdScrollbar: VmScrollbarComponent = {} as VmScrollbarComponent;
  @Input() public step: number = 50;
  private element: HTMLElement = {} as HTMLElement;
  private track: HTMLElement = {} as HTMLElement;
  private thumb: HTMLElement = {} as HTMLElement;
  private coefficientV: number = 0;
  private coefficientH: number = 0;
  private pastThumbHeight: number = 0;
  private pastTrackHeight: number = 0;

  public constructor(private el: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.init();
  }

  public ngAfterViewChecked(): void {
    this.initCoefficients();
  }

  private init(): void {
    this.element = this.el.nativeElement;
    this.track = this.vmdScrollbar.track.nativeElement;
    this.pastTrackHeight = this.track.clientHeight;
    this.thumb = this.vmdScrollbar.thumb.nativeElement;
  }

  private initCoefficients(): void {
    const deltaElementHeight = this.element.scrollHeight - this.element.clientHeight;
    const deltaTrackHeight = this.track.clientHeight - this.thumb.clientHeight;
    this.coefficientV = deltaElementHeight / deltaTrackHeight;


    // const deltaWidth = this.element.scrollWidth + this.elMarginLeft + this.elMarginRight - this.track.clientWidth;
    // this.coefficientH = deltaWidth / this.track.clientWidth;
  }

  private updateSizes(): void {
    const coefficient = this.track.clientHeight / this.pastTrackHeight;
    console.log(coefficient);
    this.vmdScrollbar.thumbY *= coefficient;
    //this.vmdScrollbar.scrollbarY *= coefficient;
  }

  private scrollDown(thumbY, thumbHeight, trackHeight, step): number {
    if (thumbY + thumbHeight + step < trackHeight) {
      return step;
    } else {
      return trackHeight - thumbY - thumbHeight;
    }
  }

  private scrollUp(thumbY, step): number {
    if (thumbY + step > 0) {
      return step;
    } else {
      return -thumbY;
    }
  }

  private getStep(deltaY): number {
    return (deltaY > 0) ? this.step : -this.step;
  }

  private verticalScroll(deltaY): void {
    if (deltaY > 0) {
      const step = this.scrollDown(
        this.vmdScrollbar.thumbY,
        this.thumb.clientHeight,
        this.track.clientHeight,
        deltaY);
      this.vmdScrollbar.thumbY += step;
      this.vmdScrollbar.scrollbarY += step * this.coefficientV;
      this.el.nativeElement.scrollTo(0, this.vmdScrollbar.scrollbarY);
    }
    if (deltaY < 0) {
      const step = this.scrollUp(this.vmdScrollbar.thumbY, deltaY);
      this.vmdScrollbar.thumbY += step;
      this.vmdScrollbar.scrollbarY += step * this.coefficientV;
      this.el.nativeElement.scrollTo(0, this.vmdScrollbar.scrollbarY);
    }
  }

  @HostListener('wheel', ['$event'])
  private onScroll(event: WheelEvent): void {
    this.verticalScroll(this.getStep(event.deltaY));
  }

  @HostListener('touchmove', ['$event'])
  private onTouchMove(event: TouchEvent): void {

  }

  @HostListener('window:resize')
  private onResize(): void {
    this.updateSizes();
  }
}
