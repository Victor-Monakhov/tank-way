import {Component, Input, OnInit} from '@angular/core';
import { WIN_SIZES } from 'src/app/app.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isVisibleMenu: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void{
    this.isVisibleMenu = !this.isVisibleMenu;
  }

}
