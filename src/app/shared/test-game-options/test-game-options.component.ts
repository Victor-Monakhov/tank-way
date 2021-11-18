import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-game-options',
  templateUrl: './test-game-options.component.html',
  styleUrls: ['./test-game-options.component.scss']
})
export class TestGameOptionsComponent implements OnInit {

  posRadios: any[] = [];

  constructor() {
  }
  ngOnInit(): void {
    this.posRadios.push(
      document.getElementById('red_1'),
      document.getElementById('red_2'),
      document.getElementById('red_3'),
      document.getElementById('red_4'),
      document.getElementById('blue_1'),
      document.getElementById('blue_2'),
      document.getElementById('blue_3'),
      document.getElementById('blue_4'));
    this.posRadios[0].checked = true;
    this.posRadios.forEach((element)=>{
      element.onclick = () =>{
        this.posRadios.forEach((item)=>{
          if(item.checked && item !== element) {
            item.checked = false;
          }
        });
        element.checked = true;
      }
    });
  }

}
