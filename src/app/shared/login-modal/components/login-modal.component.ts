import { Component, EventEmitter, HostListener, Input, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { DropMenu } from '../../header/interfaces/drop-menu.interface';

export class ValidationInfo{
  constructor(){}
  public getErrorMsg(control: AbstractControl): string {
    if(control.hasError('required')){
      return 'This field is required';
    }
    if(control.hasError('minlength')){
      return `Minimum length is ${control.errors.minlength.requiredLength} symbols`;
    }
    if(control.hasError('maxlength')){
      return `Maximum length is ${control.errors.maxlength.requiredLength} symbols`;
    }
    if(control.hasError('pattern')){
      return `Invalid input`;
    }
    if(control.hasError('email')){
      return `Invalid email`;
    }
    return '';
  }
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, DropMenu {

  public message: string = '';
  public visible: boolean = false;
  public anim: boolean = false;
  public closed: EventEmitter<void> = new EventEmitter<void>();
  public validationInfo: ValidationInfo = new ValidationInfo();
  public invalidMsg: Object = {
    nickname: '',
    email: '',
    password: '',
    confirm: '',
  };
  public signUpForm = this.fb.group({
    nickname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern('[0-9a-zA-Z]*')]],
    email: ['', [Validators.required, Validators.email]],
    password: '',
    confirm: '',
  });
  public signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: '',
  });

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
  }

  public onSubmit(){
    console.warn('Your order has been submitted', this.signUpForm.value);
    this.signUpForm.reset();
  }

  public isInvalid(control: AbstractControl, msg: string){
    this.invalidMsg[msg] = this.validationInfo.getErrorMsg(control);
    if(this.invalidMsg[msg] && (this.signUpForm.touched || this.signInForm.touched)){
      return true;
    } else {
      return false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.visible = false;
    this.closed.emit();
  }
}
