import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tnm-game-shop-btn',
  imports: [
    MatButton,
    MatIconModule,
    NgOptimizedImage,
    NgClass,
  ],
  templateUrl: './game-shop-btn.component.html',
  styleUrl: './game-shop-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameShopBtnComponent {
  iconSrc1 = input.required<string>();
  iconSrc2 = input<string>(null);
  iconSrc3 = input<string>(null);
  blocked = input<boolean>(false);
  focused = signal<boolean>(false);
  name = input<string>('');
  rotate = input<number>(0);

  onClick = output<MouseEvent>();

  rotateValue = computed<string>(() => `rotate(${this.rotate()}deg)`);
}
