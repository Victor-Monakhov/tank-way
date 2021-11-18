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
  imageWidth: number = 0;
  imageHeight: number = 0;
  currentImage = new Image();
  galleryHeight: number = 0;
  fullScreenFlag: boolean = false;

  constructor(private rd: Renderer2, private el:ElementRef) {
  }

  ngOnInit(): void {
    this.galleryHeight = this.el.nativeElement.style.height;
  }

  ngAfterContentChecked():void{
    this.imagePath = this.images[this.index];
    this.galleryBalancer(0);
  }

  win_resizeHandler(): void {
    this.galleryHeight = this.el.nativeElement.style.height;
    this.updateGallery();
    this.galleryBalancer(20);
  }

  resizeImage(padding: number, image: HTMLImageElement, element: any, fullScreen: boolean){
    let size = {
      width: 0,
      height: 0
    }
    let screen = (fullScreen) ?
                  window.innerHeight - element.firstChild.clientHeight * 2 :
                  element.clientHeight - element.firstChild.clientHeight * 2;
    let coefficientV:number = screen / image.height;
    if(image.height > screen){
      size.width = Math.round(image.width * coefficientV);
      size.height = screen;
    }
    else{
      size.width = image.width;
      size.height = image.height;
    }
    if(size.width > element.clientWidth - padding){
      let coefficientH = (element.clientWidth - padding)/size.width;
      size.width = element.clientWidth - padding;
      size.height = Math.round(coefficientH * size.height);
    }
    return size; 
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
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      this.el.nativeElement.lastChild.style.height = '100%';
      this.el.nativeElement.lastChild.style.position = 'absolute';
      this.el.nativeElement.lastChild.style.top = 0;
      this.el.nativeElement.lastChild.style.left = 0;
      this.el.nativeElement.lastChild.style.bottom = 0;
      this.el.nativeElement.lastChild.style.right = 0;
    }
    else{
      document.body.style.overflow = 'visible';
      this.el.nativeElement.lastChild.style.height = this.galleryHeight;
      this.el.nativeElement.lastChild.style.position = 'static';
    }
  }
  galleryBalancer(padding: number){
    this.currentImage.src = this.images[this.index];
    this.currentImage.onload = ()=>{
      let size = this.resizeImage(padding, this.currentImage, this.el.nativeElement.lastChild, this.fullScreenFlag);
      this.imageWidth = size.width;
      this.imageHeight = size.height;
    }
  }
}
