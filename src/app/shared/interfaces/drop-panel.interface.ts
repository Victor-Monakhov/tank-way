import {EventEmitter, TemplateRef} from '@angular/core';
import {Subject} from 'rxjs';

export interface IDropPanel {
  templateRef: TemplateRef<any>;
  closed: EventEmitter<void>;
  visible: Subject<boolean>;
}
