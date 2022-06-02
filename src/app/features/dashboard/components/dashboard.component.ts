import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    this.switchThemeMode();
  }

  private switchThemeMode(): void {
    const body = document.querySelector("body");
    const modeToggle = body.querySelector(".mode-toggle");

    const sidebar = body.querySelector("nav");
    const sidebarToggle = body.querySelector(".sidebar-toggle");

    const getMode = localStorage.getItem("mode");

    const icon = document.querySelector("#mode-icon");
    const text = document.querySelector("#mode-text");

    if (getMode && getMode === "dark") {
      body.classList.toggle("dark");
      icon.className = "uil uil-sun";
      text.innerHTML = "Light Mode";
    }

    let getStatus = localStorage.getItem("status");
    if (getStatus && getStatus === "close") {
      sidebar.classList.toggle("close");
    }

    modeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
        icon.className = "uil uil-sun";
        text.innerHTML = "Light Mode";
      } else {
        localStorage.setItem("mode", "light");
        icon.className = "uil uil-moon";
        text.innerHTML = "Dark Mode";
      }
    });

    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
      if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
      } else {
        localStorage.setItem("status", "open");
      }
    });
  }

}
