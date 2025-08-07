import { Directive, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { BaseAuthDirective } from '../base-auth/base-auth.directive';

@Directive()
export abstract class SignInUpDirective<TAuthForm extends Record<string, AbstractControl>> extends BaseAuthDirective {

  protected emailControl!: WritableSignal<FormControl<string>>;
  protected passwordControl!: WritableSignal<FormControl<string>>;

  protected abstract form: FormGroup<TAuthForm>;

}
