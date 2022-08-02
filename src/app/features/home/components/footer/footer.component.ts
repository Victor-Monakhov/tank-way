import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public columns: Array<any> = [
    {
      topic: 'Game',
      links: [
        {
          title: 'Features',
          url: '#'
        },
        {
          title: 'Rules',
          url: '#'
        },
        {
          title: '',
          url: ''
        }]
    },
    {
      topic: 'About',
      links: [
        {
          title: 'Development Team',
          url: '#'
        },
        {
          title: 'Term Of Use',
          url: '#'
        },
        {
          title: 'Privacy',
          url: '#'
        }]
    },
    {
      topic: 'Forum',
      links: [
        {
          title: 'News',
          url: '#'
        },
        {
          title: 'Gallery',
          url: '#'
        },
        {
          title: 'Support',
          url: '#'
        }]
    }
  ];

  public constructor() {
  }
}
