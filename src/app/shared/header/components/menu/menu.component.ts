import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { DropMenu } from '../../interfaces/drop-menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges, DropMenu{

  @Input() public visible: boolean = false;
  @Input() public emitClosed: boolean;
  public message: string = '';
  public closed: EventEmitter<void> = new EventEmitter<void>();
  public anim: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['emitClosed'];
    if (change.previousValue !== change.currentValue){
      this.closed.emit();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      this.visible = false;
      this.closed.emit();
  }
}
