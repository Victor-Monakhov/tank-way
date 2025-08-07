import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input, output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { debounceTime } from 'rxjs';

import { WarRoomService } from '../../../../pages/welcome-page/services/war-room/war-room.service';
import { Calculations } from '../../../../shared/classes/calculations/calculations.class';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ValidationService } from '../../../../shared/components/validation/validation-service/validation.service';
import { ITankHead } from '../../../resources/interfaces/tank.interface';

@Component({
  selector: 'tnm-tank-view',
  imports: [
    NgOptimizedImage,
    InputTextComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './tank-view.component.html',
  styleUrl: './tank-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankViewComponent {

  private readonly validationService = inject(ValidationService);
  private readonly warRoomService = inject(WarRoomService);
  private readonly dr = inject(DestroyRef);

  selectedTankHead = input.required<ITankHead>();
  selectedTankBody = input.required<ITankHead>();
  tankName = input.required<string>();
  tankNameChange = output<string>();

  tankNameControl = signal<FormControl<string>>(
    new FormControl('', {
      validators: [
        this.validationService.userNameLength,
        this.validationService.userName,
      ],
      nonNullable: true,
    }),
  );

  targetAngle = signal<number>(0);

  constructor() {
    effect(() => {
      if (this.tankName() && !this.warRoomService.tankNameLocker) {
        this.observeUserName();
        this.tankNameControl().setValue(this.tankName());
        this.warRoomService.tankNameLocker = true;
      }
    });
  }

  onMouseLeave(el: HTMLDivElement): void {
    this.targetAngle.set(0);
  }

  onTarget(event: MouseEvent, el: HTMLDivElement): void {
    const viewWidth = el.clientWidth;
    const viewHeight = el.clientHeight;
    this.targetAngle.set(Calculations.getAngleBetweenCenterAndPoint(
      viewWidth,
      viewHeight,
      event.offsetX,
      event.offsetY,
    ));
  }

  private observeUserName(): void {
    this.tankNameControl().valueChanges.pipe(
      debounceTime(500),
      takeUntilDestroyed(this.dr),
    ).subscribe(value => {
      if (this.tankNameControl().valid) {
        this.tankNameChange.emit(value);
      }
    });
  }

}
