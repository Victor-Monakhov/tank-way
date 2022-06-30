import {
  Component,
  EventEmitter,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {IDropPanel} from '../../../interfaces/drop-panel.interface';
import {Subject} from 'rxjs';

@Component({
  selector: 'vmc-drop-panel',
  templateUrl: './drop-panel.component.html',
  styleUrls: ['./drop-panel.component.scss']
})
export class DropPanelComponent implements OnInit, IDropPanel {
  @ViewChild(TemplateRef) public templateRef: TemplateRef<any> = {} as TemplateRef<any>;
  public closed: EventEmitter<void> = new EventEmitter<void>();
  public visible: Subject<boolean> = new Subject<boolean>();

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }
}
