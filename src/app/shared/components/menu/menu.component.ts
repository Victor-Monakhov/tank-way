import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { IDropModal } from '../../interfaces/drop-modal.interface';
import {Subject} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges, IDropModal{

  @ViewChild(TemplateRef) templateRef: TemplateRef<any> = {} as TemplateRef<any>;
  @Input() public emitClosed: boolean;
  public visible: Subject<boolean> = new Subject<boolean>();
  public closed: EventEmitter<void> = new EventEmitter<void>();
  public anim: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['emitClosed'];
    if (change.previousValue !== change.currentValue){
      this.closed.emit();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
      this.closed.emit();
  }
}
