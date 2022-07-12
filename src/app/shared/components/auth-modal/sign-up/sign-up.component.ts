import {
  Component, OnDestroy,
  OnInit, TemplateRef, ViewChild
} from '@angular/core';
import {FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {RegularExp} from '../../../enums/regular-exp.enum';
import {Auth} from '../auth.class';
import {VMValidator} from '../../../classes/form-validation/vm-validator.class';
import {IAuthResponse, ISignUpForm} from '../../../interfaces/auth/auth.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends Auth implements OnInit, OnDestroy {

  @ViewChild(TemplateRef) public templateRef: TemplateRef<any> = {} as TemplateRef<any>;
  public invalidMsg: ISignUpForm = {} as ISignUpForm;
  public isErrorReq: Object = {
    nickname: false,
    email: false
  }

  public form: FormGroup<any> = this.fb.group({
    nickname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15),
      Validators.pattern(RegularExp.nickname)]],
    email: ['', [Validators.required, VMValidator.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15),
      VMValidator.password]],
    confirm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
  });

  public constructor(private fb: UntypedFormBuilder, public authService: AuthService) {
    super();
  }

  public ngOnInit(): void {
    this.subscribeToNickname();
    this.subscribeToEmail();
    this.subscribeToPassword();
    this.subscribeToVisible();
    VMValidator.equalControls(this.form.get('confirm'), this.form.get('password'));
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onBack(): void {
    this.closeModal();
    this.authService.isAuthMenu.next(true);
  }

  public onSubmit(): void {
    this.authService.userInitByForm(this.form);
  }

  public successResponse(): void {
    this.authService.response.next({} as IAuthResponse);
    this.authService.isCode.next(true);
  }

  private subscribeToNickname(): void {
    this.subs.add(this.form.get('nickname').valueChanges.subscribe((nickname) => {
      this.isErrorReq['nickname'] = false;
      this.invalidMsg['nickname'] = '';
    }));
  }

  private subscribeToEmail(): void {
    this.subs.add(this.form.get('email').valueChanges.subscribe((email) => {
      this.isErrorReq['email'] = false;
      this.invalidMsg['email'] = '';
    }));
  }

  private subscribeToPassword(): void {
    this.form.get('password').valueChanges.subscribe((password) => {
      this.form.get('confirm').updateValueAndValidity();
    });
  }
}
