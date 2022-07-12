import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input, OnDestroy,
  OnInit, Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {Subject, timer} from "rxjs";
import {debounce} from "rxjs/operators";
import {SubSink} from "subsink";

@Component({
  selector: 'code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss']
})
export class CodeInputComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('input') public inputsList: QueryList<ElementRef>;
  @Input() public capacity: number = 4;
  @Output() public codeEvent: EventEmitter<string> = new EventEmitter<string>();
  private subs: SubSink = new SubSink();
  private code: Subject<string> = new Subject<string>();
  public inputs: HTMLInputElement[] = [];

  constructor() {
  }

  public ngOnInit(): void {
    this.subs.add(
      this.code.pipe(
        debounce(() => timer(800))
      ).subscribe((code) => {
        this.codeEvent.emit(code);
      })
    );
  }

  public ngAfterViewInit(): void {
    this.inputsList['_results'].forEach((elRef) => {
      this.inputs.push(elRef.nativeElement);
    });
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private isDigit(e: KeyboardEvent): boolean {
    return Number.parseInt(e.key) >= 0 && Number.parseInt(e.key) <= 9;
  }

  private isBackspace(e: KeyboardEvent): boolean {
    return e.key.toLowerCase() === 'backspace';
  }

  private isDelete(e: KeyboardEvent): boolean {
    return e.key.toLowerCase() === 'delete';
  }

  private isArrowRight(e: KeyboardEvent): boolean {
    return e.key.toLowerCase() === 'arrowright';
  }

  private isArrowLeft(e: KeyboardEvent): boolean {
    return e.key.toLowerCase() === 'arrowleft';
  }

  private focusGoRight(index: number): number {
    if (index >= 0 && index < this.inputs.length - 1) {
     setTimeout(() => {
        this.inputs[index + 1].focus();
      }, 0);
     return index + 1;
    }
    return index;
  }

  private focusGoLeft(index: number): void {
    if (index > 0 && index <= this.inputs.length - 1) {
      setTimeout(() => this.inputs[index - 1].focus(), 0);
    }
  }

  private keyFilter(e: KeyboardEvent): boolean {
    return !this.isDigit(e) &&
      !this.isBackspace(e) &&
      !this.isDelete(e) &&
      !this.isArrowLeft(e) &&
      !this.isArrowRight(e)
  }

  private getCode(): string {
    let code = '';
    this.inputs.forEach((input) => {
      code += input.value;
    });
    return code;
  }

  private digitHandler(e: KeyboardEvent, index: number): void{
    if(!this.inputs[index].value){
      this.inputs[index].value = e.key;
      this.focusGoRight(index);
    } else {
      const newIndex = this.focusGoRight(index);
      this.inputs[newIndex].value = e.key;
    }
  }

  private backspaceHandler(e: KeyboardEvent, index: number): void{
    if(!this.inputs[index].value){
      this.focusGoLeft(index);
    }
    this.inputs[index].value = '';
  }

  public onKeyDown(e: KeyboardEvent, index: number): void {
    if (!e.key) {
      return;
    }
    if (this.keyFilter(e)) {
      e.preventDefault();
      return;
    }
    if (this.isBackspace(e)) {
      this.backspaceHandler(e, index);
      return;
    }
    if (this.isArrowRight(e)) {
      this.focusGoRight(index);
      return;
    }
    if (this.isArrowLeft(e)) {
      this.focusGoLeft(index);
      return;
    }
    if (this.isDigit(e)) {
      this.digitHandler(e, index);
    }
    this.code.next(this.getCode());
  }
}
