import { Component, OnInit } from '@angular/core';
import { WIN_SIZES } from 'src/app/app.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isVisible_navMenu: boolean = false;
  isWindowBig: boolean = true;
  winSizeListener: any = window.addEventListener('resize', resize => this.win_resizeHandler());

  constructor() { }

  ngOnInit(): void {
    this.win_resizeHandler();
  }

  win_resizeHandler(): void {
    if(window.innerWidth > WIN_SIZES.MD){
      this.isVisible_navMenu = false;
      this.isWindowBig = true;
    }
    else{
      this.isWindowBig = false;
    }
  }

  onClick(): void{
    this.isVisible_navMenu = (this.isVisible_navMenu === false) ? true : false;
  }

}
