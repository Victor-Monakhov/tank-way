import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnInit, Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss']
})
export class CodeInputComponent implements OnInit, AfterViewInit {

  @ViewChildren('input') public inputsList: QueryList<ElementRef>;
  @Input() public capacity: number = 4;
  @Output() public codeEvent: EventEmitter<Subject<string>> = new EventEmitter<Subject<string>>();
  private code: Subject<string> = new Subject<string>();
  public inputs: HTMLInputElement[] = [];


  constructor() {}

  ngOnInit(): void {
    this.codeEvent.emit(this.code);
  }

  ngAfterViewInit(): void {
    this.inputsList['_results'].forEach((elRef) =>{
      this.inputs.push(elRef.nativeElement);
    });
  }

  private isDigit(e: KeyboardEvent): boolean{
    return Number.parseInt(e.key) >= 0 && Number.parseInt(e.key) <= 9;
  }

  private isBackspace(e: KeyboardEvent): boolean{
    return e.key.toLowerCase() === 'backspace';
  }

  private isDelete(e: KeyboardEvent): boolean{
    return e.key.toLowerCase() === 'delete';
  }

  private isArrowRight(e: KeyboardEvent): boolean{
    return e.key.toLowerCase() === 'arrowright';
  }

  private isArrowLeft(e: KeyboardEvent): boolean{
    return e.key.toLowerCase() === 'arrowleft';
  }

  private focusGoRight(index: number): void{
    if(index >= 0 && index < this.inputs.length - 1){
      setTimeout(()=>this.inputs[index + 1].focus(),0);
    }
  }

  private focusGoLeft(index: number): void{
    if(index > 0 && index <= this.inputs.length - 1){
      setTimeout(()=>this.inputs[index - 1].focus(),0);
    }
  }

  private keyFilter(e: KeyboardEvent): boolean{
    return !this.isDigit(e) &&
      !this.isBackspace(e) &&
      !this.isDelete(e) &&
      !this.isArrowLeft(e) &&
      !this.isArrowRight(e)
  }

  private getCode(): string{
    let code = '';
    this.inputs.forEach((input) => {
      code += input.value;
    });
    return code;
  }

  public onKeyDown(e: KeyboardEvent, index: number): void {
    if(!e.key){
      return;
    }
    if (this.keyFilter(e)){
      e.preventDefault();
      return;
    }
    if(this.isBackspace(e)){
      this.inputs[index].value = '';
      this.focusGoLeft(index);
      return;
    }
    if(this.isArrowRight(e)){
      this.focusGoRight(index);
      return;
    }
    if(this.isArrowLeft(e)){
      this.focusGoLeft(index);
      return;
    }
    if(this.isDigit(e)){
      this.inputs[index].value = e.key;
      this.focusGoRight(index);
    }
    this.code.next(this.getCode());
  }
}
