import {
  AfterViewInit,
  Component,
  ElementRef, HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import {NgScrollbar} from 'ngx-scrollbar';

@Component({
  selector: 'app-profile-cards',
  templateUrl: './profile-cards.component.html',
  styleUrls: ['./profile-cards.component.scss']
})
export class ProfileCardsComponent implements OnInit, AfterViewInit {
  @ViewChild(NgScrollbar) public scrollRef: NgScrollbar = {} as NgScrollbar;
  @ViewChild('cardsContainer') public cardsContainer: ElementRef<HTMLElement> = {} as ElementRef;
  @ViewChild('cards') public cardsRef: ElementRef<HTMLElement> = {} as ElementRef;
  public developers: Array<any> = [
    {
      id: 1,
      img: 'https://scontent.fdnk3-1.fna.fbcdn.net/v/t39.30808-1/275606858_1579126599119556_7615252278444092112_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=7206a8&_nc_ohc=N8UNY_PceEAAX9Yc5cK&_nc_ht=scontent.fdnk3-1.fna&oh=00_AT8md1oPCeiNbstncDhw68nofRTH9RErud-VHJj5IovXDg&oe=62D5A21D',
      fullName: 'Vlad Shyshkov',
      job: 'UX/UI Designer'
    },
    {
      id: 2,
      img: 'https://scontent.fdnk3-1.fna.fbcdn.net/v/t39.30808-1/284421182_5529586573741203_1769346526107408654_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=NzQXpef3RssAX_ZuDML&_nc_ht=scontent.fdnk3-1.fna&oh=00_AT-RwZjUfsh0dwNkafZnYJc-f1M_PBL8lylgPq_h_CY1SQ&oe=62D5F0F2',
      fullName: 'Oleksii Kot',
      job: 'Developer'
    },
    {
      id: 3,
      img: 'https://scontent.fdnk3-1.fna.fbcdn.net/v/t39.30808-1/274461279_7832316746794335_5954400711433159411_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=LtUWZFehu-kAX9sPfBZ&_nc_ht=scontent.fdnk3-1.fna&oh=00_AT8RXw3632BQp2YoRFEVGlD69ObMGdAR0RvHoAE2HuxDcQ&oe=62D5BFB8',
      fullName: 'Victor Monakhov',
      job: 'Developer'
    },
    {
      id: 4, img: 'https://www1.pictures.zimbio.com/gi/Los+Angeles+Premiere+MSNBC+Films+Paper+Glue+6XiNlGass26l.jpg',
      fullName: 'Ilonka Ownska', job: 'Marketing'
    },
    {
      id: 5, img: 'https://www.amazingukraine.pro/wp-content/uploads/2021/04/avatar_8768_max.jpg',
      fullName: 'Kelly Anderson', job: 'QA Engineer'
    }
  ];

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }

  public ngAfterViewInit(): void {
    this.updateScrollbar();
  }

  private updateScrollbar(): void {
    const containerWidth = this.cardsContainer.nativeElement.clientWidth;
    const cardsWidth = this.cardsRef.nativeElement.clientWidth;
    const offset = (cardsWidth - containerWidth) / 2;
    if (offset > 0) {
      this.scrollRef.scrollTo({left: offset});
    }
  }

  @HostListener('window:resize') public onResize(): void {
    this.updateScrollbar();
  }
}
