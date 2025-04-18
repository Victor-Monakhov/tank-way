import { Injectable, WritableSignal } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { EValidationErrors } from '../validation-errors.enum';


export enum EValidationRegExp {
  Name = '^[0-9a-zA-Zа-щА-ЩґҐєЄіІїЇ]*$',
  Email = '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
  Password = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$',
}

@Injectable({
  providedIn: 'root',
})
export class ValidationService {

  userNameLength(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (value.length < 2 || value.length > 15) {
      return { [EValidationErrors.UserNameLength]: true };
    }
    return null;
  }

  userName(control: AbstractControl): ValidationErrors | null {
    if (typeof (control.value) === 'string' && !control.value.match(EValidationRegExp.Name)) {
      return { [EValidationErrors.UserNameFormat]: true };
    }
    return null;
  }

  valueExist(
    pending: WritableSignal<boolean>,
    exist: WritableSignal<boolean>,
    error: EValidationErrors,
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (pending() && control.valid) {
        return { [EValidationErrors.Pending]: true };
      } else if (exist() && control.valid) {
        return { [error]: true };
      }
      return null;
    };
  }

  passwordLength(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (value.length < 8 || value.length > 15) {
      return { [EValidationErrors.PasswordLength]: true };
    }
    return null;
  }

  password(control: AbstractControl): ValidationErrors | null {
    if (typeof (control.value) === 'string' && !control.value.match(EValidationRegExp.Password)) {
      return { [EValidationErrors.PasswordFormat]: true };
    }
    return null;
  }

  email(control: AbstractControl): ValidationErrors | null {
    if (typeof (control.value) === 'string' && !control.value.match(EValidationRegExp.Email)) {
      return { [EValidationErrors.EmailFormat]: true };
    }
    return null;
  }

  equalControls(control1: AbstractControl, control2: AbstractControl): void {
    control1.addValidators(() => {
      if (control1.value !== control2.value) {
        return { [EValidationErrors.EqualControls]: true };
      }
      return null;
    });
  }

  dependentControlValid(control: AbstractControl, invalid: WritableSignal<boolean>): void {
    control.addValidators(() => {
      if (invalid()) {
        return { [EValidationErrors.DependentControl]: true };
      }
      return null;
    });
  }

}
