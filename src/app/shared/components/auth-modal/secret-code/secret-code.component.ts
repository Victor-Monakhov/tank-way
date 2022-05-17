import {Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Auth} from "../auth.class";
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ISecretCode} from "../../../interfaces/auth/secert-code.interface";
import {Subject} from "rxjs";

@Component({
  selector: 'app-secret-code',
  templateUrl: './secret-code.component.html',
  styleUrls: ['./secret-code.component.scss']
})
export class SecretCodeComponent extends Auth implements OnInit, OnDestroy {

  @ViewChild(TemplateRef) templateRef: TemplateRef<any> = {} as TemplateRef<any>;
  public get email(): string {
    return this.authService.user.value.email ?? '';
  };
  public invalidMsg: Object = {
    code: ''
  };
  public isErrorReq: Object = {
    code: false,
  }

  public form: FormGroup = this.fb.group({
    code: ['', [Validators.required]],
  });
  private bufferForm: FormGroup = this.fb.group({code: ''});

  constructor(private fb: FormBuilder, public authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.subscribeToFormChanges();
    this.subscribeToVisible();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public subscribeToFormChanges(): void {
    this.subs.add(this.form.valueChanges.subscribe((changes) => {
      if (changes['code'] !== this.bufferForm.value['code']) {
        this.isErrorReq['code'] = false;
        this.invalidMsg['code'] = '';
      }
      Object.assign(this.bufferForm, this.form);
    }));
  }

  public onSubmit(): void {
    this.authService.code.next({
      code: this.form.get('code').value,
      email: this.authService.user.value.email
    } as ISecretCode);
  }
  public onBack():void {
    this.closeModal();
    this.authService.isSignUp.next(true);
  }

  public successResponse() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.closeModal();
  }

}
