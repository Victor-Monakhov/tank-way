import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './position-selection.component.html',
  styleUrls: ['./position-selection.component.scss']
})
export class PositionSelectionComponent implements OnInit {

  posRadios: any[] = [];
  public form: FormGroup = this.fb.group({
    position: 0,
  })

  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    // this.posRadios.push(
    //   document.getElementById('red_1'),
    //   document.getElementById('red_2'),
    //   document.getElementById('red_3'),
    //   document.getElementById('red_4'),
    //   document.getElementById('blue_1'),
    //   document.getElementById('blue_2'),
    //   document.getElementById('blue_3'),
    //   document.getElementById('blue_4'));
    // this.posRadios[0].checked = true;
    // this.posRadios.forEach((element)=>{
    //   element.onclick = () =>{
    //     this.posRadios.forEach((item)=>{
    //       if(item.checked && item !== element) {
    //         item.checked = false;
    //       }
    //     });
    //     element.checked = true;
    //   }
    // });
  }

}
