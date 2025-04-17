import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VMValidator} from '../../../../../shared/classes/form-validation/vm-validator.class';
import {SubSink} from 'subsink';
import {PanelService} from '../../../../../shared/services/panel-service/panel.service';
import {AuthService} from "../../../../../shared/services/auth.service";

interface ILoginForm {
  email: FormControl<string>
  password: FormControl<string>
}

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.scss']
})
export class AuthMenuComponent implements OnInit, OnDestroy {

  private subs: SubSink = new SubSink();
  public isVisiblePassword: boolean = false;
  public isInvalidForm: boolean = false;
  public form: FormGroup<ILoginForm> = {} as FormGroup<ILoginForm>;

  public constructor(private panelService: PanelService,
                     private authService: AuthService,
                     private fb: FormBuilder) {
    this.form = fb.group({
      email: ['', [Validators.required, VMValidator.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15),
        VMValidator.password]]
    })
  }

  public ngOnInit(): void {
    this.subs.add(
      this.form.valueChanges.subscribe(() => {
        this.isInvalidForm = false;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onVisiblePassword(): void {
    this.isVisiblePassword = !this.isVisiblePassword;
  }

  public onLogin(): void {
    if (this.form.invalid) {
      this.isInvalidForm = true;
      return;
    }
  }

  public onSignUp(): void {
    this.panelService.authMenu$.next(false);
    this.panelService.signUp$.next(true);
  }

  public onLoginWithGoogle(): void {
    // this.authService.loginWithGoogle();
  }

  public onLoginWithFacebook(): void {
    // this.authService.loginWithFacebook();
  }
}
