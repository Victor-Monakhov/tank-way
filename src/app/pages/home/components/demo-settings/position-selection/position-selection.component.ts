import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder, FormGroup} from '@angular/forms';
import {DemoService} from 'src/app/pages/demo/services/demo-service/demo.service';
import {SubSink} from 'subsink';

@Component({
    selector: 'app-position-selection',
    templateUrl: './position-selection.component.html',
    styleUrls: ['./position-selection.component.scss'],
    standalone: false
})
export class PositionSelectionComponent implements OnInit, OnDestroy {

  private subs: SubSink = new SubSink();
  private readonly team1 = 'red';
  private readonly team2 = 'blue';
  public form: FormGroup<number> = {} as FormGroup;
  public team: string = 'red';

  public constructor(private fb: UntypedFormBuilder, private demoService: DemoService) {
    this.form = this.fb.group({
      position: 0
    });
  }

  public ngOnInit(): void {
    this.subs.add(
      this.form.get('position').valueChanges.subscribe(() => {
        this.saveSettings();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onTeamChange(flag: boolean): void {
    if (flag) {
      this.team = (this.team === this.team1) ? this.team2 : this.team1;
      this.form.get('position').setValue(0);
      this.saveSettings();
    }
  }

  private saveSettings(): void {
    this.demoService.demoSettings.position = this.form.get('position').value;
    this.demoService.demoSettings.team = this.team;
  }
}
