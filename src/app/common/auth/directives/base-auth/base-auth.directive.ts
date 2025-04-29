import { DestroyRef, Directive, inject, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';

import { catchError, debounceTime, EMPTY, filter, Observable, switchMap } from 'rxjs';

import { ValidationService } from '../../../../shared/components/validation/validation-service/validation.service';
import {AuthService} from "../../services/auth/auth.service";

@Directive()
export abstract class BaseAuthDirective {

  protected readonly dr = inject(DestroyRef);
  protected readonly authService = inject(AuthService);
  protected readonly validationService = inject(ValidationService);

  protected observeControlValueExist(
    control: WritableSignal<FormControl>,
    pending: WritableSignal<boolean>,
    exist: WritableSignal<boolean>,
    request: (value: string) => Observable<boolean>,
  ): void {
    let valueBuff = '';
    control().valueChanges.pipe(
      debounceTime(300),
      filter(value => {
        const condition =
          (control().valid || (exist() && Object.keys(control().errors).length === 1)) && valueBuff !== value;
        valueBuff = value;
        return condition;
      }),
      switchMap(value => {
        pending.set(true);
        control().updateValueAndValidity();
        return request(value).pipe(catchError(() => {
          pending.set(false);
          control().updateValueAndValidity();
          return EMPTY;
        }));
      }),
      takeUntilDestroyed(this.dr),
    ).subscribe(result => {
      pending.set(false);
      exist.set(result);
      control().updateValueAndValidity();
    });
  }
}
