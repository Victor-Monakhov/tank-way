import {
  Component,
  EventEmitter,
  HostListener, OnDestroy,
  OnInit, TemplateRef, ViewChild
} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IDropModal} from '../../../interfaces/drop-modal.interface';
import {BehaviorSubject, of, Subject} from "rxjs";
import {SubSink} from "subsink";
import {ValidationInfo} from "../../../classes/validator-info.class";
import {AuthService} from "../../../services/auth.service";
import {switchMap} from "rxjs/operators";
import {RegularExp} from "../../../enums/regular-exp.enum";
import {ISignInForm, ISignUpForm} from "../../../interfaces/forms.interface";
import {Auth} from "../auth.class";

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
    email: ['', [Validators.required, Validators.email, Validators.pattern(RegularExp.email)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
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

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.closeModal();
  }
}
