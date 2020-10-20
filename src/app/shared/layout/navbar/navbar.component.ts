import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  username:string;
  navbarOpen:boolean;
  sidebarOpen:boolean;


  constructor(private authService: AuthService, private router:Router) {
    this.username = authService.getUserName();
    this.navbarOpen = false;
    this.sidebarOpen = false;
   }

  ngOnInit(): void {
   
  }


  toggleNavbar() {
    console.log("toogle nav bar");
    this.navbarOpen = !this.navbarOpen;
  }

  toggleSidebar() {
    console.log("toogle side bar");
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(){
    this.authService.clearStorage();
    this.router.navigateByUrl('/login');
  }

}
