import {Component, ContentChild, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  public closeDropElement: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onMenuItem(){
    this.closeDropElement = !this.closeDropElement;
  }
}
