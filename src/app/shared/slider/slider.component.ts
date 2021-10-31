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
  constructor(private rd: Renderer2, private el:ElementRef) {
    
   }

  ngOnInit(): void {
    this.currentImage.src = this.images[this.index];
    this.currentImage.onload = ()=>{
    let size = this.resizeImage(20, this.currentImage, this.el.nativeElement);
    this.galleryWidth = size.width;
    this.galleryHeight = size.height;
    }
  }

  ngAfterContentChecked():void{
    this.imagePath = this.images[this.index];
  }

  win_resizeHandler(): void {
    this.currentImage.src = this.images[this.index];
    this.currentImage.onload = ()=>{
    let size = this.resizeImage(40, this.currentImage, this.el.nativeElement);
    this.galleryWidth = size.width;
    this.galleryHeight = size.height;
    }
  }
  resizeImage(padding: number, image: HTMLImageElement, element: HTMLElement ){
    let size = {
      width: 0,
      height: 0
    }
    size.width = element.clientWidth - padding;
    let coefficient:number = (element.clientWidth - padding) / image.width; 
    size.height = Math.round(coefficient * image.height);
    return size;
  }

  clickLeft(){
    if(this.index === 0)
      this.index = this.images.length - 1;
    else
      --this.index;
  }

  clickRight(){
    if(this.index === this.images.length - 1)
      this.index = 0;
    else
      ++this.index;
  }
}
