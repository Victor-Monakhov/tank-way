import {
  Component, OnDestroy,
  OnInit, TemplateRef, ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import {Auth} from "../auth.class";
import {VMValidator} from "../../../classes/form-validation/vm-validator.class";
import {ISignInForm} from "../../../interfaces/auth/auth.interface";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent extends Auth implements OnInit, OnDestroy {

  @ViewChild(TemplateRef) templateRef: TemplateRef<any> = {} as TemplateRef<any>;
  public invalidMsg: ISignInForm = {} as ISignInForm;
  public isErrorReq: Object = {
    password: false,
  }

  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, VMValidator.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, public authService: AuthService) {
    super();
  }

  public ngOnInit(): void {
    this.subscribeToPassword();
    this.subscribeToVisible();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public subscribeToPassword(): void {
    this.subs.add(this.form.get('password').valueChanges.subscribe(() => {
        this.isErrorReq['password'] = false;
        this.invalidMsg['password'] = '';
    }));
  }

  public onSubmit(): void {
    this.authService.userInitByForm(this.form);
  }

  public onBack(){
    this.closeModal();
    this.authService.isAuthMenu.next(true);
  }

  public successResponse() {
  }
}
