import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'vmc-scrollbar',
  templateUrl: './vm-scrollbar.component.html',
  styleUrls: ['./vm-scrollbar.component.scss']
})
export class VmScrollbarComponent implements OnInit {

  @ViewChild('thumb') public thumb: ElementRef<HTMLElement> = {} as ElementRef<HTMLElement>;
  @ViewChild('track') public track: ElementRef<HTMLElement> = {} as ElementRef<HTMLElement>;
  // @ViewChild('scrollbar') public scrollbar: ElementRef<HTMLElement> = {} as ElementRef<HTMLElement>;
  public thumbY: number = 0;
  public scrollbarY: number = 0;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }

}
