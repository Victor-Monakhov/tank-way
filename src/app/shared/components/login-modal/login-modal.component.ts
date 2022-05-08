import {
  Component,
  EventEmitter,
  HostListener, OnDestroy,
  OnInit
} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IDropModal} from '../../interfaces/drop-menu.interface';
import {BehaviorSubject} from "rxjs";
import {SubSink} from "subsink";
import {ValidationInfo} from "../../classes/validator-info.class";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, OnDestroy, IDropModal {

  public subs: SubSink = new SubSink();
  public message: BehaviorSubject<string> = new BehaviorSubject<string>('hello');
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
  public signUp: Object = {
    nickname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern('[0-9a-zA-Z]*')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    confirm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
  }
  public signIn: Object = {
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
  }
  public form: FormGroup;

  constructor(private fb: FormBuilder,) {
  }

  public ngOnInit(): void {
    this.subs.add(this.message.subscribe(() => {
      this.form = this.fb.group((() => {
        if (this.message.value === 'Sign Up') {
          return this.signUp;
        } else {
          return this.signIn;
        }
      })());
    }));
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
    console.log('goodbye');
  }

  public onSubmit() {
    console.warn('Your order has been submitted', this.form.value);
    this.form.reset();
  }

  public isInvalid(control: AbstractControl, msg: string) {
    this.invalidMsg[msg] = this.validationInfo.getErrorMsg(control);
    if (this.invalidMsg[msg] && this.form.touched) {
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
