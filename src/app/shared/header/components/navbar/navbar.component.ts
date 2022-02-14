import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  public theme: string = 'blue';
  @Output() public themeEvent: EventEmitter<string> = new EventEmitter<string>();
  public menuContent: string[] = ['Sign up', 'Sign in', 'About game'];

  constructor() {
  }

  ngOnInit(): void {
  }

  public onTheme(theme: string) {
    this.theme = theme;
    this.themeEvent.emit(theme);
  }
}
