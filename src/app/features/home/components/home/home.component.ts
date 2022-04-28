import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {

  public galleryMode: string = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onDemo() {
    this.router.navigate(['demo']);
  }
}
