import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-gameboard-header',
  templateUrl: './gameboard-header.component.html',
  styleUrls: ['./gameboard-header.component.scss']
})
export class GameboardHeaderComponent implements OnInit {

  public constructor(private ElByClassName: ElementRef) {
  }

  public ngOnInit(): void {
    this.initProgressBar();
  }

  private initProgressBar(): void {
    const progressBar = (<HTMLElement> this.ElByClassName.nativeElement).querySelector(
      '.progress-bar');
    const level = (<HTMLElement> this.ElByClassName.nativeElement).querySelector(
      '.level');

    let progressValue = 0;
    let progressEndValue = 65;
    let speed = 50;

    let progress = setInterval(() => {
      progressValue++;
      level.textContent = `${progressValue}`;

      (progressBar as HTMLElement).style.background = `conic-gradient(#CE9F25FF ${progressValue * 3.6}deg,
       #F5F5F5 ${progressValue * 3.6}deg)`;

      if (progressValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  }
}
