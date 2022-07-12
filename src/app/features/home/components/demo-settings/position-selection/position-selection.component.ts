import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, FormGroup} from '@angular/forms';
import {DemoService} from 'src/app/features/demo/services/demo.service';

@Component({
  selector: 'app-position-selection',
  templateUrl: './position-selection.component.html',
  styleUrls: ['./position-selection.component.scss']
})
export class PositionSelectionComponent implements OnInit {

  public form: FormGroup<number> = {} as FormGroup;
  public team: string = 'red';

  public constructor(private fb: UntypedFormBuilder, private demoService: DemoService) {
    this.form = this.demoService.form = this.fb.group({
      position: 0
    });
  }

  public ngOnInit(): void {
    return;
  }

  //  public onSetPosition() {
  // this.demoService.position = this.form.controls['position'].value;
  // console.log(this.form.controls['position'].value);

  // console.log(this.demoService.position);
  // }

  public onTeamChange(flag: boolean): void {
    if (flag) {
      this.team = (this.team === 'red') ? 'blue' : 'red';
      this.form.get('position').setValue(0);
    }
  }

}
