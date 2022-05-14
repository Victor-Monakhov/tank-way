import {AbstractControl} from "@angular/forms";
import {RegularExp} from "../../enums/regular-exp.enum";

export class VMValidator {
  constructor(){}
  public static getErrorMsg(control: AbstractControl): string {
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
    if(control.hasError('password')){
      return `Minimum: eight characters, one uppercase letter, one lowercase letter, one number`;
    }
    if(control.hasError('equalControls')){
      return `Password and confirm are different`;
    }
    return '';
  }

  public static equalControls(control1: AbstractControl, control2: AbstractControl): void{
    control1.addValidators(() =>{
      if(control1.value !== control2.value){
        return {'equalControls' : true}
      }
      return null;
    });
  }

  public static email(control: AbstractControl){
    if(typeof(control.value) === 'string' && !control.value.match(RegularExp.email)){
      return {'email' : true}
    }
    return null;
  }

  public static password(control: AbstractControl){
    if(typeof(control.value) === 'string' && !control.value.match(RegularExp.password)){
      return {'password' : true}
    }
    return null;
  }
}
