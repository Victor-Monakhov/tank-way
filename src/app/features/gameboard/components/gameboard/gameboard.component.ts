import {Component} from '@angular/core';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent {

  public navLinks: Array<any> = [
    {link: '/', icon: 'fa-solid fa-jet-fighter', title: 'Battlegrounds'},
    {link: '#', icon: 'fa-solid fa-warehouse', title: 'Hangar'},
    {link: '#', icon: 'fa-solid fa-industry', title: 'Base'},
    {link: '#', icon: 'fa-solid fa-gear', title: 'Settings'}
  ];

  public constructor() {
  }
}
