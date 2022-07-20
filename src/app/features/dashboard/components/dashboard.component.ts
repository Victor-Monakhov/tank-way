import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {LocalizationService} from "../../../shared/services/internationalization/localization.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users?: any[];
  public navLinks: Array<any> = [
    {link: '/', icon: 'fa-solid fa-gamepad', name: 'Dashboard'},
    {link: '#', icon: 'fa-solid fa-play', name: 'Play'},
    {link: '#', icon: 'fa-solid fa-message', name: 'Chat'},
    {link: '#', icon: 'fa-solid fa-image', name: 'NFT Gallery'},
    {link: '#', icon: 'fa-solid fa-sliders', name: 'Settings'},
  ];
  public boxes: Array<any> = [
    {icon: 'fa-solid fa-chart-column', title: 'Statistic1', data: '20,123'},
    {icon: 'fa-solid fa-chart-column', title: 'Statistic2', data: '10,123'},
    {icon: 'fa-solid fa-chart-column', title: 'Statistic3', data: '1,123'}
  ]
  public displayedColumns = ['ID', 'Nickname', 'Email', 'Password', 'Token', 'Status', 'Actions'];

  constructor(private userService: UserService, private localizationService: LocalizationService) {
    //localizationService.useLanguage('en-US');

    for (let index = 0; index < this.navLinks.length; index++) {
      this.navLinks[index].name = 'DASHBOARD.NAV_' + index.toString();
    }
  }

  ngOnInit(): void {
    this.getUsers();
    this.switchThemeMode();
  }

  public getUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  public getUserById(id: number): any {
    return this.users.find((el: any) => el.id === id);
  }

  public refreshList(): void {
    this.getUsers();
  }

  public deleteUser(id: number): void {
    if (confirm(`Are you sure want to delete the user ${this.getUserById(id).nickname} from the database?`)) {
      this.userService.delete(id)
        .subscribe({
          next: (data) => {
            console.log(data);
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
    const body = document.querySelector(".dashboard-wrapper");
    const modeToggle = body.querySelector(".mode-toggle");

    const sidebar = body.querySelector(".sidebar");
    const sidebarToggle = body.querySelector(".sidebar-toggle");

    const getMode = localStorage.getItem("mode");
    const icon = document.querySelector("#mode-icon");

    if (getMode && getMode === "dark") {
      body.classList.toggle("dark");
    }

    let getStatus = localStorage.getItem("status");
    if (getStatus && getStatus === "close") {
      sidebar.classList.toggle("close");
      icon.className = "";
    }

    modeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
      } else {
        localStorage.setItem("mode", "light");
      }
    });

    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
      if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
        icon.className = "";
      } else {
        localStorage.setItem("status", "open");
        icon.className = "fa-solid fa-moon";
      }
    });
  }
}
