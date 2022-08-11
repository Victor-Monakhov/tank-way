import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-gameboard-header',
  templateUrl: './gameboard-header.component.html',
  styleUrls: ['./gameboard-header.component.scss']
})
export class GameboardHeaderComponent implements OnInit {

  public constructor() {
  }

  public ngOnInit(): void {
    this.initProgressBar();
  }

  private initProgressBar(): void {
    let progressBar = document.querySelector('.progress-bar');
    let value = document.querySelector('.level');

    let progressValue = 0;
    let progressEndValue = 65;
    let speed = 100;

    let progress = setInterval(() => {
      progressValue++;
      value.textContent = `${progressValue}`;

      (progressBar as HTMLElement).style.background = `conic-gradient(#CE9F25FF ${progressValue * 3.6}deg,
       #F5F5F5 ${progressValue * 3.6}deg)`;

      if (progressValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  }
}
