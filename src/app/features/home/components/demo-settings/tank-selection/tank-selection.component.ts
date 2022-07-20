import {Component, OnInit} from '@angular/core';
import {Calculations} from '../../../../../shared/classes/calculations/calculations.class';

@Component({
  selector: 'app-tank-selection',
  templateUrl: './tank-selection.component.html',
  styleUrls: ['./tank-selection.component.scss']
})
export class TankSelectionComponent implements OnInit {
  public selectedTankBody: string = '';
  public selectedTankHead: string = '';
  public targetAngle: number = 0;
  public tankBodies: string[] = [
    '../../assets/images/tanks/T_1.png',
    '../../assets/images/tanks/T_2.png',
    '../../assets/images/tanks/T_3.png',
    '../../assets/images/tanks/T_4.png',
    '../../assets/images/tanks/T_3.png',
    '../../assets/images/tanks/T_2.png',
    '',
    '../../assets/images/tanks/T_1.png',
    '../../assets/images/tanks/T_2.png'
  ];
  public tankHeads: string[] = [
    '../../assets/images/tanks/gun_1.png',
    '../../assets/images/tanks/gun_2.png',
    '../../assets/images/tanks/gun_3.png',
    '',
    '../../assets/images/tanks/gun_4.png',
    '../../assets/images/tanks/gun_5.png',
    '../../assets/images/tanks/gun_4.png',
    '../../assets/images/tanks/gun_3.png',
    '../../assets/images/tanks/gun_2.png'
  ];

  public readonly viewHeight: number = 150;
  public readonly viewWidth: number = 200;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }

  public onBody(index: number): void {
    if (this.tankBodies.length > index && index >= 0) {
      this.selectedTankBody = this.tankBodies[index];
    }
  }

  public onHead(index: number): void {
    if (this.tankHeads.length > index && index >= 0) {
      this.selectedTankHead = this.tankHeads[index];
    }
  }

  public checkBodySelection(index: number): boolean {
    return this.selectedTankBody === this.tankBodies[index];
  }

  public checkHeadSelection(index: number): boolean {
    return this.selectedTankHead === this.tankHeads[index];
  }

  public onTarget(event: MouseEvent): void {
    this.targetAngle = Calculations.getAngleBetweenCenterAndPoint(
      this.viewWidth,
      this.viewHeight,
      event.offsetX,
      event.offsetY
    );
  }
}
