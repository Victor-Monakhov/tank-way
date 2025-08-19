import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ValidationService } from '../../../../shared/components/validation/validation-service/validation.service';
import { ETankItemType } from '../../../resources/enums/game.enum';
import { IShopDealConfig } from '../../../resources/interfaces/shop.interface';
import { GameItemBtnComponent } from '../../game-buttons/game-item-btn/game-item-btn.component';

@Component({
  standalone: true,
  selector: 'tnm-shop-deal-dialog',
  imports: [
    MatButton,
    GameItemBtnComponent,
    NgOptimizedImage,
    InputTextComponent,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './shop-deal-dialog.component.html',
  styleUrl: './shop-deal-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopDealDialogComponent implements OnInit {

  private readonly dr = inject(DestroyRef);
  private readonly dialogRef = inject(MatDialogRef<ShopDealDialogComponent>);
  private readonly validationService = inject(ValidationService);
  readonly data = inject<IShopDealConfig>(MAT_DIALOG_DATA);

  quantityControl = new FormControl<number>(1, [
    Validators.required, Validators.min(1), Validators.max(1000),
  ]);

  price = signal<number>(this.data.shopItem.price);
  isDeal = computed<boolean>(() => this.data.playerArenas >= this.price());

  get isBullet(): boolean {
    return this.data.shopItem.item.itemType === ETankItemType.Bullet;
  }

  ngOnInit(): void {
    this.observeQuantity();
    this.validationService.multipleOf(this.quantityControl);
  }

  onCancel(): void {
    this.dialogRef.close({
      price: 0,
      quantity: 0,
      shopItem: this.data.shopItem,
      result: false,
    });
  }

  onConfirm(): void {
    if (this.quantityControl.valid && this.isDeal()) {
      this.dialogRef.close({
        price: this.price(),
        quantity: +this.quantityControl.value,
        shopItem: this.data.shopItem,
        result: true,
      });
    }
  }

  private observeQuantity(): void {
    this.quantityControl.valueChanges.pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(value => {
      if (this.quantityControl.valid) {
        this.price.set(this.data.shopItem.price * value);
      }
    });
  }
}
