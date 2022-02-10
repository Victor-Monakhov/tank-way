import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-menu',
  templateUrl: './drop-menu.component.html',
  styleUrls: ['./drop-menu.component.scss']
})
export class DropMenuComponent implements OnInit {

  public isVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }



}
