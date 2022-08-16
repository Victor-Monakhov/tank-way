import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-gameboard-header',
  templateUrl: './gameboard-header.component.html',
  styleUrls: ['./gameboard-header.component.scss']
})
export class GameboardHeaderComponent implements OnInit {

  public valueToNextLevel: number = 2345;

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
    let levelValue = 0;
    let speed = 50;

    if (this.valueToNextLevel >= 2000 && this.valueToNextLevel <= 2500) {
      levelValue = 10;
    }

    let progress = setInterval(() => {
      progressValue++;
      level.textContent = `${levelValue}`;

      (progressBar as HTMLElement).style.background = `conic-gradient(#CE9F25FF ${progressValue * 3.6}deg,
       #F5F5F5 ${progressValue * 3.6}deg)`;

      if (progressValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  }
}
