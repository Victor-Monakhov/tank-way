import {
  ChangeDetectionStrategy,
  Component, effect,
  ElementRef,
  HostBinding,
  inject,
  input, model,
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
  state = model<boolean>(false);
  click = output<MouseEvent>();

  color = signal<string>('#000000');

  @HostBinding('class') private modeClass = `${this.mode()}-close`;

  constructor() {
    const mode = this.mode();
    effect(() => {
      this.updateState(mode);
    });
  }

  ngOnInit(): void {
    const color = window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('color');
    this.color.set(color);
  }

  public onBurger(event: MouseEvent): void {
    event.stopPropagation();
    this.state.update(state => !state);
    this.click.emit(event);
  }

  private updateState(mode: TBurgerMode): void {
    const close = `${mode}-close`;
    const open = `${mode}-open`;
    this.modeClass = (this.state()) ? open : close;
  }
}
