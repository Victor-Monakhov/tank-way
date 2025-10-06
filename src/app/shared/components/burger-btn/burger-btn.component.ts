import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  input,
  OnInit,
  output, signal,
} from '@angular/core';

import { TBurgerMode } from './burger-btn';

@Component({
  standalone: true,
  selector: 'tnm-burger-btn',
  imports: [],
  templateUrl: './burger-btn.component.html',
  styleUrl: './burger-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurgerBtnComponent implements OnInit {

  private readonly elementRef = inject(ElementRef);
  mode = input<TBurgerMode>('dynamic-all');
  click = output<MouseEvent>();

  color = signal<string>('#000000');

  @HostBinding('class') private state = `${this.mode()}-close`;

  ngOnInit(): void {
    const color = window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('color');
    this.color.set(color);
  }

  public onBurger(event: MouseEvent): void {
    event.stopPropagation();
    const close = `${this.mode()}-close`;
    const open = `${this.mode()}-open`;
    this.state = (this.state === close) ? open : close;
    this.click.emit(event);
  }
}
