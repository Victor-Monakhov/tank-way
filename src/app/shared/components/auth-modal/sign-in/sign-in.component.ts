import {
  Component,
  HostListener, OnDestroy,
  OnInit, TemplateRef, ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import {ISignInForm} from "../../../interfaces/auth/forms.interface";
import {Auth} from "../auth.class";
import {VMValidator} from "../../../classes/form-validation/vm-validator.class";

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
  private bufferForm: FormGroup = this.fb.group({} as ISignInForm);

  constructor(private fb: FormBuilder, public authService: AuthService) {
    super();
  }

  public ngOnInit(): void {
    this.subscribeToFormChanges();
    this.subscribeToVisible();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public subscribeToFormChanges(): void {
    this.subs.add(this.form.valueChanges.subscribe((changes) => {
      if (changes['password'] !== this.bufferForm.value['password']) {
        this.isErrorReq['password'] = false;
        this.invalidMsg['password'] = '';
      }
      Object.assign(this.bufferForm, this.form);
    }));
  }

  public onSubmit(): void {
    this.authService.userInitByForm(this.form);
  }

  public successResponse() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.closeModal();
  }
}
