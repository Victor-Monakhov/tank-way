import {Directive, Input} from '@angular/core';
import {DropMenuComponent} from "../drop-menu/drop-menu.component";

@Directive({
  selector: '[appDropMenu]',
  host: {
    "(click)": "toggleDropdown()"
  },
})
export class DropMenuDirective {

  @Input() public appDropMenu: DropMenuComponent;

  constructor() {

  }

  public toggleDropdown(){
    this.appDropMenu.isVisible = !this.appDropMenu.isVisible;
  }


}
