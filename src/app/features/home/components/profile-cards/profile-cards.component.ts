import {Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-profile-cards',
  templateUrl: './profile-cards.component.html',
  styleUrls: ['./profile-cards.component.scss']
})
export class ProfileCardsComponent implements OnInit {
  @ViewChildren('card') public cardsList: QueryList<ElementRef>;
  public cards: HTMLElement[] = [];

  constructor() {
  }

  public developers: Array<any> = [
    {
      id: 1,
      img: 'https://scontent.fdnk3-1.fna.fbcdn.net/v/t39.30808-6/275606858_1579126599119556_7615252278444092112_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=QqwxD7xh8BQAX-OUpNW&_nc_ht=scontent.fdnk3-1.fna&oh=00_AT9gH3RaXzXVBDLolkDTyr4BTCVCMFi8Je3qpy4A7tF5PA&oe=62C6F49F',
      fullName: 'Vlad Shyshkov',
      job: 'UX/UI Designer'
    },
    {
      id: 2,
      img: 'https://scontent.fdnk3-1.fna.fbcdn.net/v/t39.30808-6/284421182_5529586573741203_1769346526107408654_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WYQjI1n_StAAX9UlzI-&_nc_ht=scontent.fdnk3-1.fna&oh=00_AT9-bKhNb6t_lYlhM3aaFKPVD90UUo7NKe5tsPo3bLKiRw&oe=62C77974',
      fullName: 'Oleksii Kot',
      job: 'Developer'
    },
    {
      id: 3,
      img: 'https://scontent.fdnk3-1.fna.fbcdn.net/v/t39.30808-6/274461279_7832316746794335_5954400711433159411_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=1gS0ZNIdYO0AX9AALFD&_nc_ht=scontent.fdnk3-1.fna&oh=00_AT9eqPCujpBosPZNaVJKKAYoMpSgCD5qFqkXzO5gPJbgCQ&oe=62C76376',
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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.scrollToTargetId(3);

  }

  scrollToTargetId(targetId) {
    this.cardsList['_results'].forEach((elRef) => {
      this.cards.push(elRef.nativeElement);
    });
    this.cards[targetId].scrollIntoView({block: "center"});
  }
}
