import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() public mode: string = 'static';
  @Input()public visible: boolean = false;
  @Input('menuContent') public menuContent: string[];
  @Output() public closed = new EventEmitter<void>();
  public anim: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}
