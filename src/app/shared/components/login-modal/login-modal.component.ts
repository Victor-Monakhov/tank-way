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
import {AuthService} from "../../services/auth.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit, OnDestroy, IDropModal {

  public subs: SubSink = new SubSink();
  public type: BehaviorSubject<string> = new BehaviorSubject<string>('hello');
  public visible: boolean = false;
  public anim: boolean = false;
  public closed: EventEmitter<void> = new EventEmitter<void>();
  public validationInfo: ValidationInfo = new ValidationInfo();
  public isErrorReq: Object = {
    nickname: false,
    email: false,
  }
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
  private bufferForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  public ngOnInit(): void {
    this.subs.add(this.type.pipe(
      switchMap((type) => {
        this.form = this.initForm(type);
        this.bufferForm = this.initForm(type);
        return  this.form.valueChanges;
      })
    ).subscribe((changes) => {
      if(changes['nickname'] !== this.bufferForm.value['nickname']){
        this.isErrorReq['nickname'] = false;
        this.invalidMsg['nickname'] = '';
      }
      if(changes['email'] !== this.bufferForm.value['email']){
        this.isErrorReq['email'] = false;
        this.invalidMsg['email'] = '';
      }
      Object.assign(this.bufferForm, this.form);
    }));



    this.subs.add(this.authService.response.subscribe((response) => {
      console.log(response);
      if (response) {
        if (response.success) {
          this.form.reset();
        } else {
          this.isErrorReq[response.type] = this.isInvalid(response.type);
        }
      }
    }));
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public initForm(type: string){
    return this.fb.group((() => {
      if (type === 'Sign Up') {
        return this.signUp;
      } else {
        return this.signIn;
      }
    })());
  }

  public onSubmit() {
    this.authService.userInitByForm(this.form);
  }

  public isInvalid(msg: string, control: AbstractControl | null = null) {
    if (control) {
      this.invalidMsg[msg] = this.validationInfo.getErrorMsg(control);
    } else {
      this.invalidMsg[msg] = this.authService.response.value.message;
    }
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
