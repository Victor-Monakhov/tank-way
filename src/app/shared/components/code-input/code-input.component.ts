import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss']
})
export class CodeInputComponent implements OnInit {

  @Input() public capacity: number = 2;
  @Input() public cellWidth: string = '1rem';
  @Input() public cellBorder: string = '';
  @Input() public cellMargin: string = '';
  @Input() public cellPadding: string = '';
  @Input() public cellBorderRadius: string = '';
  @Input() public cellBackground: string = '';
  public values: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.values.length = this.capacity;
  }

  public onKeyDown(event): void {
    const isNumbers = event.keyCode >= 48 && event.keyCode <= 57;
    const isBackspace = event.keyCode === 8;
    const isDelete = event.keyCode === 46;
    if (!isNumbers && !isBackspace && !isDelete){
      event.preventDefault();
    }
  }

}
