import {
  AfterViewChecked,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {GalleryService, Image} from "../services/gallery.service";
import {SubSink} from "subsink";
import {WIN_SIZES} from "../../../app.config";
import {from} from "rxjs";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('slider') public slider: ElementRef;

  private subs: SubSink = new SubSink();
  public images: Image[] = [];
  public scrollY: number = 0;
  public sliderWidth: number = 0;
  public columnGap: number = 15;
  public imgWidth: number = 200;
  public imgBorderWidth: number = 1;
  public visible: boolean = false;
  public columns: number = 0;


  constructor(private galleryService: GalleryService, private dChanges: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subs.add(
      this.galleryService.getImages().subscribe(images => {
        this.images = images;
        this.setSliderWidth();
      }));
    //this.onResize();
  }

  ngAfterViewChecked() {
      // if(WIN_SIZES.LG < window.innerWidth){
      //   this.columns = Math.ceil(this.images.length / 2);
      // } else if(WIN_SIZES.MD < window.innerWidth) {
      //   this.columns = Math.ceil(this.images.length / 2);
      // } else if(WIN_SIZES.SM < window.innerWidth) {
      //   this.columns = Math.ceil(this.images.length / 3);
      // } else if(WIN_SIZES.XS < window.innerWidth) {
      //   this.columns = Math.ceil(this.images.length / 4);
      // }
      // if(this.slider) {
      //   this.dChanges.detectChanges();
      //   //this.slider = new ElementRef<HTMLDivElement>(this.slider.nativeElement);
      //   this.setSliderHeight();
      // }
  }

  private setSliderWidth() {
    const gapsSum = (this.images.length - 1) * (this.columnGap - this.imgBorderWidth * 2);
    const imagesSum = this.images.length * this.imgWidth;
    const borderSum = this.images.length * this.imgBorderWidth * 2;
    this.sliderWidth = gapsSum + imagesSum + borderSum;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onMoveLeft(scroll: WheelEvent) {
    const contentWidth = this.slider.nativeElement.clientWidth;
    const scrollDistance: number = this.sliderWidth - contentWidth;
    const blockLeft: boolean = this.scrollY === 0 && scroll.deltaY > 0;
    const blockRight: boolean = this.scrollY <= -scrollDistance && scroll.deltaY < 0;
    if (this.scrollY <= 0 && !blockRight && !blockLeft) {
      const futureScrollY = this.scrollY + scroll.deltaY;
      const dScrollRight = (futureScrollY < -scrollDistance) ? futureScrollY + scrollDistance : 0;
      const dScrollLeft = (futureScrollY > 0) ? futureScrollY : 0
      this.scrollY += scroll.deltaY - dScrollRight - dScrollLeft;
    }
  }

  public onVisible(){
    this.visible = !this.visible;
    this.dChanges.detectChanges();
    //this.setSliderHeight();
    this.onResize()
  }

  @HostListener('window:resize', ['$event'])
  private onResize() {
    if(WIN_SIZES.LG < window.innerWidth){
      this.columns = Math.ceil(this.images.length / 2);
    } else if(WIN_SIZES.MD < window.innerWidth) {
      this.columns = Math.ceil(this.images.length / 2);
    } else if(WIN_SIZES.SM < window.innerWidth) {
      this.columns = Math.ceil(this.images.length / 3);
    } else if(WIN_SIZES.XS < window.innerWidth) {
      this.columns = Math.ceil(this.images.length / 4);
    }
    if(this.slider) {
      this.setSliderHeight();
    }
  }

  private setSliderHeight(){
    if(this.visible){
        this.slider.nativeElement.style.height = this.slider.nativeElement.scrollHeight + 'px';
        this.slider.nativeElement.style.paddingTop = '10px';
    } else {
      this.slider.nativeElement.style.height = 0;
      this.slider.nativeElement.style.paddingTop = 0;
    }
  }
}
