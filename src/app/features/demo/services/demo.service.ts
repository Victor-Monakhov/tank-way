import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  public form: FormGroup;

  constructor() {
   }
}
