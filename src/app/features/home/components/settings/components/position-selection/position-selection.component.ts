import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DemoService } from 'src/app/features/demo/services/demo.service';

@Component({
  selector: 'app-settings',
  templateUrl: './position-selection.component.html',
  styleUrls: ['./position-selection.component.scss']
})
export class PositionSelectionComponent implements OnInit {

  public form = this.demoService.form = this.fb.group({
    position: 0,
  });

  constructor(private fb: FormBuilder, private demoService: DemoService) {
  }
  ngOnInit(): void {
  }

  public onSetPosition(){
    // this.demoService.position = this.form.controls['position'].value;
    // console.log(this.form.controls['position'].value);
    
    // console.log(this.demoService.position);
  }

}
