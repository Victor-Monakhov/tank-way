import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { IDropModal } from '../../interfaces/drop-menu.interface';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges, IDropModal{

  @Input() public visible: boolean = false;
  @Input() public emitClosed: boolean;
  public type: BehaviorSubject<string> = new BehaviorSubject<string>('');
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
