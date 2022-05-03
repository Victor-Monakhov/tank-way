import { Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { DropMenu } from '../../header/interfaces/drop-menu.interface';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, DropMenu {

  public visible: boolean = false;
  public anim: boolean = false;
  public closed: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.visible = false;
    this.closed.emit();
  }
}
