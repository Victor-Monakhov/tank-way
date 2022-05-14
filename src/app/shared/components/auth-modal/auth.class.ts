import {switchMap} from "rxjs/operators";
import {of, Subject} from "rxjs";
import {SubSink} from "subsink";
import {EventEmitter, TemplateRef} from "@angular/core";
import {VMValidator} from "../../classes/form-validation/vm-validator.class";
import {IDropModal} from "../../interfaces/drop-modal.interface";
import {AuthService} from "../../services/auth.service";
import {AbstractControl, FormGroup} from "@angular/forms";

export abstract class Auth implements IDropModal{

  abstract templateRef: TemplateRef<any>;
  abstract form: FormGroup;
  abstract isErrorReq: Object;
  abstract invalidMsg: Object;
  abstract authService: AuthService;


  protected subs: SubSink = new SubSink();
  public visible: Subject<boolean> = new Subject<boolean>();
  public closed: EventEmitter<void> = new EventEmitter<void>();
  public anim: boolean = false;
  public isVisiblePassword: boolean = false;


  protected constructor() {
  }

  abstract subscribeToFormChanges(): void;
  abstract successResponse(): void;

  private clearMsg() {
    for (let key in this.isErrorReq) {
      this.isErrorReq[key] = false;
    }
    for (let key in this.invalidMsg) {
      this.invalidMsg[key] = '';
    }
  }

  protected closeModal() {
    this.isVisiblePassword = false;
    this.form.reset();
    this.clearMsg();
    this.closed.emit();
  }


  protected subscribeToVisible(): void {
    this.subs.add(this.visible.pipe(
      switchMap((isVisible) => {
        if (isVisible) {
          return this.authService.response;
        } else {
          return of(null);
        }
      })
    ).subscribe((response) => {
      if (!response) {
        this.closeModal();
        return;
      }
      if (response.success) {
        this.closeModal();
        this.successResponse();
        return;
      } else {
        this.isErrorReq[response.type] = this.isInvalid(response.type);
      }
    }));
  }

  public onVisiblePassword(): void {
    this.isVisiblePassword = !this.isVisiblePassword;
  }

  public isInvalid(msg: string, control: AbstractControl = null): boolean {
    if (control) {
      this.invalidMsg[msg] = VMValidator.getErrorMsg(control);
    } else {
      this.invalidMsg[msg] = this.authService.response.value.message;
    }
    return this.invalidMsg[msg] && this.form.touched;
  }
}
