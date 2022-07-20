import {Injectable} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  public form: UntypedFormGroup;

  public constructor() {
   }
}
