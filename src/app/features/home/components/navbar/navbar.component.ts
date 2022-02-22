import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  public menuContent: string[] = ['Sign up', 'Sign in', 'About game'];

  constructor() {
  }

  ngOnInit(): void {
  }
}
