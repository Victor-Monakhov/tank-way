import {AbstractControl} from "@angular/forms";

export class ValidationInfo{
  constructor(){}
  public getErrorMsg(control: AbstractControl, confirm: AbstractControl = null): string {
    if(control.hasError('required')){
      return 'This field is required';
    }
    if(control.hasError('minlength')){
      return `Minimum length is ${control.errors.minlength.requiredLength} symbols`;
    }
    if(control.hasError('maxlength')){
      return `Maximum length is ${control.errors.maxlength.requiredLength} symbols`;
    }
    if(control.hasError('email')){
      return `Invalid email`;
    }
    if(control.hasError('pattern')){
      return `Invalid input`;
    }
    // if(confirm){
    //   confirm.setErrors({confirm: control.value !== confirm.value});
    //   if(confirm.hasError('confirm')){
    //     return 'password and confirm are different';
    //   }
    // }
    return '';
  }
}
