import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tnm-game-item-btn',
  imports: [
    MatButtonModule,
    NgOptimizedImage,
    MatIconModule,
    NgClass,
  ],
  templateUrl: './game-item-btn.component.html',
  styleUrl: './game-item-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameItemBtnComponent {

  iconSrc1 = input.required<string>();
  iconSrc2 = input<string>(null);
  iconSrc3 = input<string>(null);
  blocked = input<boolean>(false);
  priced = input<boolean>(false);
  focused = input<boolean>(false);
  rounded = input<boolean>(false);
  smallIcon = input<boolean>(false);
  largeIcon = input<boolean>(false);
  name = input<string>('');
  rotate = input<number>(0);
  price = input<number>(0);

  onClick = output<MouseEvent>();

  rotateValue = computed<string>(() => `rotate(${this.rotate()}deg)`);
}
