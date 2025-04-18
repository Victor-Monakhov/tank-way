import { DestroyRef, Directive, inject, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { ValidationService } from '../../../../shared/components/validation/validation-service/validation.service';

@Directive()
export abstract class BaseAuthDirective<TAuthForm extends Record<string, AbstractControl>> {

  protected readonly dr = inject(DestroyRef);
  protected readonly validationService = inject(ValidationService);

  protected emailControl!: WritableSignal<FormControl<string>>;
  protected passwordControl!: WritableSignal<FormControl<string>>;

  protected abstract form: FormGroup<TAuthForm>;
}
