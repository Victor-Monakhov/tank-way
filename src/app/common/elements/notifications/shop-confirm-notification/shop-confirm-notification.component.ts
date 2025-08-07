import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ENotificationTypes } from '../../../resources/enums/notification.enum';
import { IShopNotificationConfig } from '../../../resources/interfaces/shop.interface';
import { GameItemBtnComponent } from '../../game-buttons/game-item-btn/game-item-btn.component';

@Component({
  standalone: true,
  selector: 'tnm-shop-confirm-notification',
  imports: [
    MatButton,
    GameItemBtnComponent,
  ],
  templateUrl: './shop-confirm-notification.component.html',
  styleUrl: './shop-confirm-notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopConfirmNotificationComponent {
  private readonly dialogRef = inject(MatDialogRef<ShopConfirmNotificationComponent>);
  readonly data = inject<IShopNotificationConfig>(MAT_DIALOG_DATA);

  types = ENotificationTypes;

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
