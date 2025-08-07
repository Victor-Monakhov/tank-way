import { Directive, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NoopValueAccessorDirective),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => NoopValueAccessorDirective),
    },
  ],
})
export class NoopValueAccessorDirective implements ControlValueAccessor, Validator {
  writeValue(value: unknown): void {}
  registerOnChange(onChange: (value: unknown) => void): void {}
  registerOnTouched(onTouched: () => void): void {}
  setDisabledState?(disabled: boolean): void {}
  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }
}
