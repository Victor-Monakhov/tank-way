import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  HostListener,
  OnDestroy,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {GalleryService, IImage} from '../../../services/gallery.service';
import {SubSink} from 'subsink';
import {WIN_SIZES} from '../../../../app.config';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SliderComponent implements OnInit, OnDestroy {

  @ViewChild('slider') public slider: ElementRef;
  @ViewChild('image') public image: ElementRef;
  @Output() public eventFullScreen: EventEmitter<string> = new EventEmitter<string>();

  private subs: SubSink = new SubSink();
  private screenSize: number = 0;
  public images: IImage[] = [];
  public scrollY: number = 0;
  public visible: boolean = false;
  public sliderStyles: CSSStyleDeclaration;
  public sliderWidth: number;
  public fullScreenMode: boolean = false;

  public constructor(private galleryService: GalleryService, private dChanges: ChangeDetectorRef, private router: Router) {
  }

  public ngOnInit(): void {
    this.subs.add(
      this.galleryService.getImages().subscribe((images) => {
        this.galleryService.images$.next(images);
        this.images = this.galleryService.images$.value;
      }));
  }

  private setSliderWidth(): number {
    const columns = this.sliderStyles.getPropertyValue('grid-template-columns').split(' ').length;
    const gap: number = Number.parseInt(this.sliderStyles.getPropertyValue('grid-column-gap'), 10);
    const gapsSum = (columns - 1) * gap;
    const imagesSum = this.image.nativeElement.offsetWidth * columns;
    return gapsSum + imagesSum;
  }

  private getSliderHeight(): number {
    const rows: number = this.sliderStyles.getPropertyValue('grid-template-rows').split(' ').length;
    const gap: number = Number.parseInt(this.sliderStyles.getPropertyValue('grid-column-gap'), 10);
    const gapsSum = (rows - 1) * gap;
    const imagesSum = this.image.nativeElement.offsetHeight * rows;
    return gapsSum + imagesSum;
  }


  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onMoveLeft(scroll: WheelEvent): void {
    scroll.preventDefault();
    const contentWidth = this.slider.nativeElement.clientWidth;
    const scrollDistance: number = this.sliderWidth - contentWidth;
    const blockLeft: boolean = this.scrollY === 0 && scroll.deltaY > 0;
    const blockRight: boolean = this.scrollY <= -scrollDistance && scroll.deltaY < 0;
    if (this.scrollY <= 0 && !blockRight && !blockLeft) {
      const futureScrollY = this.scrollY + scroll.deltaY;
      const dScrollRight = (futureScrollY < -scrollDistance) ? futureScrollY + scrollDistance : 0;
      const dScrollLeft = (futureScrollY > 0) ? futureScrollY : 0
      this.scrollY += scroll.deltaY - dScrollRight - dScrollLeft;
      this.slider.nativeElement.scroll({left: -this.scrollY});
    }
  }

  public onVisible(): void {
    this.visible = !this.visible;
    this.dChanges.detectChanges();
    this.onResize(true);
  }

  public onImage(id: number) {
    // this.subs.add(this.galleryService.getImage().subscribe(image => this.galleryService.image$.next(image)));
    this.eventFullScreen.emit(id.toString());
  }


  @HostListener('window:resize', ['$event'])
  private onResize(flag: boolean = false): void {
    let screenSize: number;
    if (WIN_SIZES.MD < window.innerWidth) {
      screenSize = WIN_SIZES.MD;
    } else if (WIN_SIZES.SM < window.innerWidth) {
      screenSize = WIN_SIZES.SM;
    } else if (WIN_SIZES.XS < window.innerWidth) {
      screenSize = WIN_SIZES.XS;
    }
    if (this.slider && (screenSize !== this.screenSize || flag)) {
      this.screenSize = screenSize;
      this.sliderStyles = getComputedStyle(this.slider.nativeElement);
      this.sliderWidth = this.setSliderWidth();
      this.setSliderHeight();
    }
  }

  private setSliderHeight(): void {
    if (this.visible && this.slider) {
      this.slider.nativeElement.style.height = this.getSliderHeight() + 'px';
      this.slider.nativeElement.style.paddingTop = '10px';
    } else if (this.slider) {
      this.slider.nativeElement.style.height = 0;
      this.slider.nativeElement.style.paddingTop = 0;
    }
  }
}
