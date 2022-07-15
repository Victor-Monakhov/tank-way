import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {IUser} from "../../../shared/interfaces/auth/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users?: any[];
  public displayedColumns = ['ID', 'Nickname', 'Email', 'Password', 'Token', 'Status', 'Actions'];

  constructor(private userService: UserService, private router: Router) {
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
            this.getUsers();
          },
          error: (e) => console.error(e)
        });
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
  }

  private removeAllUsers(): void {
    this.userService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getUsers();
        },
        error: (e) => console.error(e)
      });
  }

  private switchThemeMode(): void {
    const body = document.querySelector(".dashboard-wrapper");
    const modeToggle = body.querySelector(".mode-toggle");

    const sidebar = body.querySelector(".sidebar");
    const sidebarToggle = body.querySelector(".sidebar-toggle");

    const getMode = localStorage.getItem("mode");

    const icon = document.querySelector("#mode-icon");
    const text = document.querySelector("#mode-text");

    if (getMode && getMode === "dark") {
      body.classList.toggle("dark");
      icon.className = "fa-solid fa-sun";
      text.innerHTML = "Light Mode";
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
        icon.className = "fa-solid fa-sun";
        text.innerHTML = "Light Mode";
      } else {
        localStorage.setItem("mode", "light");
        icon.className = "fa-solid fa-moon";
        text.innerHTML = "Dark Mode";
      }
    });

    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
      if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
        icon.className = "";
      } else {
        localStorage.setItem("status", "open");
        if (body.classList.contains("dark")) {
          icon.className = "fa-solid fa-sun";
        }
        icon.className = "fa-solid fa-moon";
      }
    });
  }

}
