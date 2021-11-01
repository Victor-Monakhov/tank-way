import { AfterContentChecked, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterContentChecked{
  imagePath: string = '';
  images: string[] = [
    "../../../../assets/images/home-gallery/1.jpg",
    "../../../../assets/images/home-gallery/2.jpg",
    "../../../../assets/images/home-gallery/3.jpg",
    "../../../../assets/images/home-gallery/4.jpg",
  ];
  index:number = 0;
  winSizeListener: any = window.addEventListener('resize', resize => this.win_resizeHandler());
  galleryWidth: number = 0;
  galleryHeight: number = 0;
  currentImage = new Image();
  fullScreenFlag: boolean = false;

  constructor(private rd: Renderer2, private el:ElementRef) {
  }

  ngOnInit(): void {
    this.galleryBalancer(0);
  }

  ngAfterContentChecked():void{
    this.imagePath = this.images[this.index];
  }

  win_resizeHandler(): void {
    this.updateGallery();
    this.galleryBalancer(20);
  }
  resizeImage(padding: number, image: HTMLImageElement, element: any, fullScreen: boolean){
    let size = {
      width: 0,
      height: 0
    }
    if(!fullScreen){
      size.width = element.clientWidth - padding;
      let coefficient:number = (element.clientWidth - padding) / image.width; 
      size.height = Math.round(coefficient * image.height);
      return size;
    }
    else{
      let coefficientV:number = (window.innerHeight - element.firstChild.clientHeight * 2) / image.height;
      size.width = (image.height > window.innerHeight - element.firstChild.clientHeight * 2) ?
                    Math.round(image.width * coefficientV) :
                    image.width;
      size.width = (size.width > element.clientWidth - padding) ?
                    element.clientWidth - padding :
                    size.width;
      let coefficientH:number = (size.width) / image.width;
      size.height = Math.round(coefficientH * image.height);
      return size;
    }
  }

  clickLeft(): void{
    if(this.index === 0)
      this.index = this.images.length - 1;
    else
      --this.index;
    this.galleryBalancer(20);
  }

  clickRight(): void{
    if(this.index === this.images.length - 1)
      this.index = 0;
    else
      ++this.index;
    this.galleryBalancer(20);
  }

  clickFullScreen(): void{
    this.fullScreenFlag = !this.fullScreenFlag;
    this.updateGallery();
    this.galleryBalancer(20);
  }
  updateGallery(): void{
    if(this.fullScreenFlag){
      document.body.style.overflow = 'hidden';
      this.el.nativeElement.lastChild.style.position = 'absolute';
      this.el.nativeElement.lastChild.style.top = 0;
      this.el.nativeElement.lastChild.style.left = 0;
      this.el.nativeElement.lastChild.style.bottom = 0;
      this.el.nativeElement.lastChild.style.right = 0;
    }
    else{
      document.body.style.overflow = 'visible';
      this.el.nativeElement.lastChild.style.position = 'static';
    }
  }
  galleryBalancer(padding: number){
    this.currentImage.src = this.images[this.index];
    this.currentImage.onload = ()=>{
      let size = this.resizeImage(padding, this.currentImage, this.el.nativeElement.lastChild, this.fullScreenFlag);
      this.galleryWidth = size.width;
      this.galleryHeight = size.height;
    }
  }
}
