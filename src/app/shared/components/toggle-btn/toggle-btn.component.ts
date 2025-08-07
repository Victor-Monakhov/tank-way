import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'vms-toggle-btn',
  imports: [
    FormsModule,
    NgClass,
    MatRippleModule,
  ],
  templateUrl: './toggle-btn.component.html',
  styleUrl: './toggle-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ToggleBtnComponent),
    },
  ],
})
export class ToggleBtnComponent implements ControlValueAccessor {

  value1 = input.required<string>();
  value2 = input.required<string>();

  value = model<string>();

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  onToggle(): void {
    this.value.set(this.value() === this.value1() ? this.value2() : this.value1());
    this.onChange(this.value());
  }

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }
}
