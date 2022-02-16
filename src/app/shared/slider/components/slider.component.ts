import { AfterContentChecked, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {GalleryService, Image} from "../services/gallery.service";
import {BehaviorSubject, Observable} from "rxjs";
import {SubSink} from "subsink";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit{

  private subs: SubSink = new SubSink();
  public images$: BehaviorSubject<Image[]> = new BehaviorSubject<Image[]>([]);

  constructor(private galleryService: GalleryService) {
  }

  ngOnInit(): void {
    this.subs.add(this.galleryService.getImages().subscribe(images => this.images$.next(images)));
  }

  public onMoveLeft(scroll: Event){
    console.log(scroll);
  }

  // ngAfterContentChecked():void{
  //   this.imagePath = this.images[this.index];
  //   this.galleryBalancer(this.galleryPadding);
  // }
  //
  // win_resizeHandler(): void {
  //   this.galleryHeight = this.el.nativeElement.style.height;
  //   this.updateGallery();
  //   this.galleryBalancer(this.galleryPadding);
  // }
  //
  // resizeImage(padding: number, image: HTMLImageElement, element: any, fullScreen: boolean){
  //   let size = {
  //     width: 0,
  //     height: 0
  //   }
  //   let screenHeight:number = (fullScreen) ?
  //                 window.innerHeight - element.firstChild.clientHeight * 2 :
  //                 element.clientHeight - element.firstChild.clientHeight * 2;
  //   let coefficientV:number = screenHeight / image.height;
  //   if(image.height > screenHeight){
  //     size.width = Math.round(image.width * coefficientV) - padding;
  //     size.height = screenHeight;
  //   }
  //   else{
  //     size.width = image.width;
  //     size.height = image.height;
  //   }
  //   if(size.width > element.clientWidth){
  //     let coefficientH:number = (element.clientWidth - padding)/size.width;
  //     size.width = element.clientWidth - padding;
  //     size.height = Math.round(coefficientH * size.height);
  //   }
  //   return size;
  // }
  //
  clickLeft(): void{
  //   if(this.index === 0)
  //     this.index = this.images.length - 1;
  //   else
  //     --this.index;
  //   this.galleryBalancer(this.galleryPadding);
  }
  //
  clickRight(): void{
  //   if(this.index === this.images.length - 1)
  //     this.index = 0;
  //   else
  //     ++this.index;
  //   this.galleryBalancer(this.galleryPadding);
  }
  //
  clickFullScreen(): void{
  //   this.fullScreenFlag = !this.fullScreenFlag;
  //   this.updateGallery();
  //   this.galleryBalancer(this.galleryPadding);
  }
  // updateGallery(): void{
  //   if(this.fullScreenFlag){
  //     window.scrollTo(0, 0);
  //     document.body.style.overflow = 'hidden';
  //     this.el.nativeElement.lastChild.style.height = '100%';
  //     this.el.nativeElement.lastChild.style.position = 'absolute';
  //     this.el.nativeElement.lastChild.style.top = 0;
  //     this.el.nativeElement.lastChild.style.left = 0;
  //     this.el.nativeElement.lastChild.style.bottom = 0;
  //     this.el.nativeElement.lastChild.style.right = 0;
  //   }
  //   else{
  //     document.body.style.overflow = 'visible';
  //     this.el.nativeElement.lastChild.style.height = this.galleryHeight;
  //     this.el.nativeElement.lastChild.style.position = 'static';
  //   }
  // }
  // galleryBalancer(padding: number){
  //   this.currentImage.src = this.images[this.index];
  //   this.currentImage.onload = ()=>{
  //     let size = this.resizeImage(padding, this.currentImage, this.el.nativeElement.lastChild, this.fullScreenFlag);
  //     this.imageWidth = size.width;
  //     this.imageHeight = size.height;
  //   }
  // }
}
