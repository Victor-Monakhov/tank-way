import {
  Component,
  HostListener, OnDestroy,
  OnInit, TemplateRef, ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import {RegularExp} from "../../../enums/regular-exp.enum";
import {ISignUpForm} from "../../../interfaces/auth/forms.interface";
import {Auth} from "../auth.class";
import {VMValidator} from "../../../classes/form-validation/vm-validator.class";
import {IResponseMessage} from "../../../interfaces/auth/response-message.interface";
import {Subject} from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent extends Auth implements OnInit, OnDestroy {

  @ViewChild(TemplateRef) templateRef: TemplateRef<any> = {} as TemplateRef<any>;
  public invalidMsg: ISignUpForm = {} as ISignUpForm;
  public isErrorReq: Object = {
    nickname: false,
    email: false,
  }

  public form: FormGroup = this.fb.group({
    nickname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15),
      Validators.pattern(RegularExp.nickname)]],
    email: ['', [Validators.required, VMValidator.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15),
      VMValidator.password]],
    confirm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
  });
  private bufferForm: FormGroup = this.fb.group({} as ISignUpForm);

  constructor(private fb: FormBuilder, public authService: AuthService) {
    super();
  }

  public ngOnInit(): void {
    this.subscribeToFormChanges();
    this.subscribeToVisible();
    VMValidator.equalControls(this.form.get('confirm'), this.form.get('password'));
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public subscribeToFormChanges(): void {
    this.subs.add(this.form.valueChanges.subscribe((changes) => {
      if (changes['nickname'] !== this.bufferForm.value['nickname']) {
        this.isErrorReq['nickname'] = false;
        this.invalidMsg['nickname'] = '';
      }
      if (changes['email'] !== this.bufferForm.value['email']) {
        this.isErrorReq['email'] = false;
        this.invalidMsg['email'] = '';
      }
      Object.assign(this.bufferForm, this.form);
    }));
  }

  public onBack(): void{
    this.closeModal();
    this.authService.isAuthMenu.next(true);
  }

  public onSubmit(): void {
    this.authService.userInitByForm(this.form);
  }

  public successResponse() {
    this.authService.response.next({} as IResponseMessage);
    this.authService.isCode.next(true);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.closeModal();
  }
}
