import {Component, OnInit} from '@angular/core';
import {Calculations} from '../../../../../shared/classes/calculations/calculations.class';
import {DemoService} from '../../../../demo/services/demo-service/demo.service';
import {ITankBody} from '../../../interfaces/tank-body.interface';
import {ITankHead} from '../../../interfaces/tank-head.interface';

@Component({
  selector: 'app-tank-selection',
  templateUrl: './tank-selection.component.html',
  styleUrls: ['./tank-selection.component.scss']
})
export class TankSelectionComponent implements OnInit {
  public selectedTankBody: ITankBody = {} as ITankBody;
  public selectedTankHead: ITankHead = {} as ITankHead;
  public targetAngle: number = 0;
  public tankBodies: ITankBody[] = [
    {name: 'T_1', path: 'assets/images/tanks/T_1.png'} as ITankBody,
    {name: 'T_2', path: 'assets/images/tanks/T_2.png'} as ITankBody,
    {name: 'T_3', path: 'assets/images/tanks/T_3.png'} as ITankBody,
    {name: 'T_4', path: 'assets/images/tanks/T_4.png'} as ITankBody,
    {name: 'T_3', path: 'assets/images/tanks/T_3.png'} as ITankBody,
    {name: 'T_2', path: 'assets/images/tanks/T_2.png'} as ITankBody,
    {} as ITankBody,
    {name: 'T_1', path: 'assets/images/tanks/T_1.png'} as ITankBody,
    {name: 'T_2', path: 'assets/images/tanks/T_2.png'} as ITankBody
  ];
  public tankHeads: ITankHead[] = [
    {name: 'gun_1', path: 'assets/images/tanks/gun_1.png'} as ITankHead,
    {name: 'gun_2', path: 'assets/images/tanks/gun_2.png'} as ITankHead,
    {name: 'gun_3', path: 'assets/images/tanks/gun_3.png'} as ITankHead,
    {} as ITankHead,
    {name: 'gun_4', path: 'assets/images/tanks/gun_4.png'} as ITankHead,
    {name: 'gun_5', path: 'assets/images/tanks/gun_5.png'} as ITankHead,
    {name: 'gun_4', path: 'assets/images/tanks/gun_4.png'} as ITankHead,
    {name: 'gun_3', path: 'assets/images/tanks/gun_3.png'} as ITankHead,
    {name: 'gun_2', path: 'assets/images/tanks/gun_2.png'} as ITankHead
  ];

  public readonly viewHeight: number = 150;
  public readonly viewWidth: number = 200;

  public constructor(private demoService: DemoService) {
  }

  public ngOnInit(): void {
    return;
  }

  public onBody(index: number): void {
    if (this.tankBodies.length > index && index >= 0) {
      this.selectedTankBody = this.tankBodies[index];
      this.saveSettings();
    }
  }

  public onHead(index: number): void {
    if (this.tankHeads.length > index && index >= 0) {
      this.selectedTankHead = this.tankHeads[index];
      this.saveSettings();
    }
  }

  public checkBodySelection(index: number): boolean {
    return this.selectedTankBody.path === this.tankBodies[index].path;
  }

  public checkHeadSelection(index: number): boolean {
    return this.selectedTankHead.path === this.tankHeads[index].path;
  }

  public onTarget(event: MouseEvent): void {
    this.targetAngle = Calculations.getAngleBetweenCenterAndPoint(
      this.viewWidth,
      this.viewHeight,
      event.offsetX,
      event.offsetY
    );
  }

  private saveSettings(): void {
    this.demoService.demoSettings.tankHead = this.selectedTankHead.name;
    this.demoService.demoSettings.tankBody = this.selectedTankBody.name;
  }
}
