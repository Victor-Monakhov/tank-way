import {
  ChangeDetectionStrategy,
  Component, inject,
  output, signal,
  viewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ValidationService } from '../../../../shared/components/validation/validation-service/validation.service';
import { IQuantityResult } from '../../../resources/interfaces/game.interface';

@Component({
  standalone: true,
  selector: 'tnm-quantity-menu',
  imports: [
    InputTextComponent,
    ReactiveFormsModule,
    MatButton,
    MatMiniFabButton,
    MatIconModule,
  ],
  templateUrl: './quantity-menu.component.html',
  styleUrl: './quantity-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantityMenuComponent {

  private readonly validationService = inject(ValidationService);

  quantityChange = output<IQuantityResult>();
  inputText = viewChild(InputTextComponent);

  quantity = signal<string>('1');

  quantityControl = new FormControl<number>(1);

  updateValidators(quantity: number): void {
    this.quantity.set(quantity.toString());
    this.quantityControl.setValidators([
      Validators.required, Validators.min(1), Validators.max(quantity),
    ]);
    this.validationService.multipleOf(this.quantityControl);
    this.quantityControl.updateValueAndValidity();
    this.quantityControl.patchValue(quantity);
    this.inputText().cdr.detectChanges();
  }

  onCancel(): void {
    this.quantityChange.emit({
      status: false,
      quantity: 0,
    });
  }

  onSubmit(): void {
    if (this.quantityControl.valid) {
      this.quantityChange.emit({
        status: true,
        quantity: +this.quantityControl.value,
      });
    }
  }
}
