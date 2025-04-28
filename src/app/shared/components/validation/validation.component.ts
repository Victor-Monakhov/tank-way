import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  input,
  OnInit, Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatError } from '@angular/material/form-field';

import { TranslatePipe } from '@ngx-translate/core';

import {combineLatest, map} from 'rxjs';

import { NoopValueAccessorDirective } from '../../directives/noop-value-accessor/noop-value-accessor.directive';

import { EValidationErrors } from './validation-errors.enum';

@Component({
  standalone: true,
  selector: 'tnm-validation',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,

    MatError,
  ],
  hostDirectives: [NoopValueAccessorDirective],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationComponent implements OnInit {

  private readonly injector = inject(Injector);

  formControl = input.required<FormControl>();
  errorMsg!: Signal<string>;

  ngOnInit(): void {
    const formControl = this.formControl();
    this.errorMsg = toSignal<string>(
      combineLatest([formControl.valueChanges, formControl.statusChanges]).pipe(
        map(() => {
          if (formControl?.hasError(EValidationErrors.Required) && formControl.touched) {
            return 'errors.required_field_error';
          }
          if (formControl?.hasError(EValidationErrors.EmailFormat) && formControl.touched) {
            return 'errors.email_format_error';
          }
          if (formControl?.hasError(EValidationErrors.UserNameLength) && formControl.touched) {
            return 'errors.user_name_length_error';
          }
          if (formControl?.hasError(EValidationErrors.PasswordLength) && formControl.touched) {
            return 'errors.password_length_error';
          }
          if (formControl?.hasError(EValidationErrors.UserNameFormat) && formControl.touched) {
            return 'errors.user_name_format_error';
          }
          if (formControl?.hasError(EValidationErrors.PasswordFormat) && formControl.touched) {
            return 'errors.password_format_error';
          }
          if (formControl?.hasError(EValidationErrors.EqualControls) && formControl.touched) {
            return 'errors.confirm_password_error';
          }
          if (formControl?.hasError(EValidationErrors.UserNameExist) && formControl.touched) {
            return 'errors.user_name_exist_error';
          }
          if (formControl?.hasError(EValidationErrors.EmailExist) && formControl.touched) {
            return 'errors.email_exist_error';
          }
          if (formControl?.hasError(EValidationErrors.InvalidCredentials) && formControl.touched) {
            return 'errors.invalid_credentials_error';
          }
          return '';
        }),
      ),
      { injector: this.injector },
    ) as Signal<string>;
  }
}
