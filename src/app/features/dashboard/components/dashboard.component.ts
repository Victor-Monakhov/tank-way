import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LocalizationService} from '../../../shared/services/internationalization/localization.service';
import {UserService} from '../../../shared/services/user.service';
import {IUser} from '../../../shared/interfaces/auth/auth.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('dashboard_wrapper') private dashboardWrapper: ElementRef;
  @ViewChild('mode_icon') private modeIcon: ElementRef;

  public users?: any[];
  public navLinks: Array<any> = [
    {link: '/', icon: 'fa-solid fa-gamepad', name: 'Dashboard'},
    {link: '#', icon: 'fa-solid fa-play', name: 'Play'},
    {link: '#', icon: 'fa-solid fa-message', name: 'Chat'},
    {link: '#', icon: 'fa-solid fa-image', name: 'NFT Gallery'},
    {link: '#', icon: 'fa-solid fa-sliders', name: 'Settings'}
  ];
  public boxes: Array<any> = [
    {icon: 'fa-solid fa-chart-column', title: 'Statistic1', data: '20,123'},
    {icon: 'fa-solid fa-chart-column', title: 'Statistic2', data: '10,123'},
    {icon: 'fa-solid fa-chart-column', title: 'Statistic3', data: '1,123'}
  ]
  public displayedColumns = ['ID', 'Nickname', 'Email', 'Password', 'Token', 'Status', 'Actions'];

  public constructor(private userService: UserService, private localizationService: LocalizationService) {
    // localizationService.useLanguage('en-US');
    for (let index = 0; index < this.navLinks.length; index++) {
      this.navLinks[index].name = 'DASHBOARD.NAV_' + index.toString();
    }
  }

  public ngOnInit(): void {
    this.getUsers();
  }

  public ngAfterViewInit(): void {
    this.switchThemeMode();
  }

  public getUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          // console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  public getUserById(id: number): IUser {
    return this.users.find((el: IUser) => el.id === id);
  }

  public refreshList(): void {
    this.getUsers();
  }

  public deleteUserById(id: number): void {
    if (confirm(`Are you sure want to delete the ${this.getUserById(id).nickname.toUpperCase()} from the database?`)) {
      this.userService.delete(id)
        .subscribe({
          next: () => {
            this.refreshList();
          },
          error: (e) => console.error(e)
        });
    } else {
      // Do nothing!
      console.log('Thing was not deleted in database.');
    }
  }

  private switchThemeMode(): void {
    const modeToggle = this.dashboardWrapper.nativeElement.querySelector('.mode-toggle');
    const sidebar = this.dashboardWrapper.nativeElement.querySelector('.sidebar');
    const sidebarToggle = this.dashboardWrapper.nativeElement.querySelector('.sidebar-toggle');

    const getMode = localStorage.getItem('mode');
    const getStatus = localStorage.getItem('status');

    if (getMode && getMode === 'dark') {
      this.dashboardWrapper.nativeElement.classList.toggle('dark');
    }

    if (getStatus && getStatus === 'close') {
      sidebar.classList.toggle('close');
      this.modeIcon.nativeElement.className = '';
    }

    modeToggle.addEventListener('click', () => {
      this.dashboardWrapper.nativeElement.classList.toggle('dark');
      if (this.dashboardWrapper.nativeElement.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
      } else {
        localStorage.setItem('mode', 'light');
      }
    });

    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('close');
      if (sidebar.classList.contains('close')) {
        localStorage.setItem('status', 'close');
        this.modeIcon.nativeElement.className = '';
      } else {
        localStorage.setItem('status', 'open');
        this.modeIcon.nativeElement.className = 'fa-solid fa-moon';
      }
    });
  }
}
