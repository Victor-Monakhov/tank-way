import {Component, OnInit} from '@angular/core';

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
    this.selectedTankBody = this.tankBodies[index];
  }

  public onHead(index: number): void {
    this.selectedTankHead = this.tankHeads[index];
  }

  public checkBodySelection(index: number): boolean {
      return this.selectedTankBody === this.tankBodies[index];
  }

  public checkHeadSelection(index: number): boolean {
    return this.selectedTankHead === this.tankHeads[index];
  }

  public onTarget(event: MouseEvent): void {
    const tgA = (event.offsetY - this.viewHeight / 2) / (event.offsetX - this.viewWidth / 2);
    if (this.viewWidth / 2 < event.offsetX)
      this.targetAngle = Math.atan(tgA) * 180 / Math.PI;
    else
      this.targetAngle = Math.atan(tgA) * 180 / Math.PI + 180;
  }
}
