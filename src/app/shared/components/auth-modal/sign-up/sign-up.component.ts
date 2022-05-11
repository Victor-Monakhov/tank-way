import {
  Component,
  HostListener, OnDestroy,
  OnInit, TemplateRef, ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import {RegularExp} from "../../../enums/regular-exp.enum";
import {ISignUpForm} from "../../../interfaces/forms.interface";
import {Auth} from "../auth.class";

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
    nickname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(RegularExp.nickname)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(RegularExp.email)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    confirm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
  });
  private bufferForm: FormGroup = this.fb.group({} as ISignUpForm);

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

  public onSubmit(): void {
    this.authService.userInitByForm(this.form);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.closeModal();
  }
}
