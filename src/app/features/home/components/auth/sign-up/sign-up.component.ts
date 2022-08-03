import {Component, OnDestroy, OnInit} from '@angular/core';
import {PanelService} from '../../../../../shared/services/panel-service/panel.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VMValidator} from '../../../../../shared/classes/form-validation/vm-validator.class';
import {RegularExp} from '../../../../../shared/enums/regular-exp.enum';
import {SubSink} from 'subsink';

interface ISignUpForm {
  nickname: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirm: FormControl<string>;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  private subs: SubSink = new SubSink();
  public isVisiblePassword: boolean = false;
  public isVisibleConfirm: boolean = false;
  public form: FormGroup<ISignUpForm> = {} as FormGroup<ISignUpForm>;

  public constructor(private panelService: PanelService,
                     private fb: FormBuilder) {
    this.form = fb.group({
      nickname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15),
        Validators.pattern(RegularExp.nickname)]],
      email: ['', [Validators.required, VMValidator.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15),
        VMValidator.password]],
      confirm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    })
  }

  public ngOnInit(): void {
    VMValidator.equalControls(this.form.get('confirm'), this.form.get('password'));
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onVisiblePassword(): void {
    this.isVisiblePassword = !this.isVisiblePassword;
  }

  public onVisibleConfirm(): void {
    this.isVisibleConfirm = !this.isVisibleConfirm;
  }

  public checkControlLength(control: AbstractControl<string>): boolean {
    return !((control.hasError('minlength') ||
            control.hasError('maxlength') ||
            control.hasError('required')) &&
            control.touched);
  }

  public checkControlNumber(control: AbstractControl<string>): boolean {
    return !(!/\d/.test(control.value) && control.touched);
  }

  public checkControlUppercase(control: AbstractControl<string>): boolean {
    return !(!control.value.split('').
            find((char) => !/[a-z]/.test(char) && /[A-Z]/.test(char)) &&
            control.touched);
  }

  public checkControlLowercase(control: AbstractControl<string>): boolean {
    return !(!control.value.split('').
      find((char) => /[a-z]/.test(char) && !/[A-Z]/.test(char)) &&
      control.touched);
  }

  public onCreate(): void {

  }

}
