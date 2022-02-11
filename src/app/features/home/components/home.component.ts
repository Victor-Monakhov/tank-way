import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    "[class.blue-theme]": "(theme === 'blue')",
    "[class.red-theme]": "(theme === 'red')"
  },
})
export class HomeComponent implements OnInit {

  public theme: string = 'blue';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  setTheme(theme: string){
    this.theme = theme;
  }

  onClick() {
    this.router.navigate(['testGame']);
  }
}
