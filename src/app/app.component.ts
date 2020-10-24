import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DigiprizmaDemoApp';
  username:string;
  navbarOpen:boolean;
  sidebarOpen:boolean;

  constructor(private authService: AuthService, private router:Router) {
    this.navbarOpen = false;
    this.sidebarOpen = false;

    if(this.username === null){
     this.router.navigateByUrl('/login');
    }else{
      this.router.navigateByUrl('/');
    }
   }

  ngOnInit(): void {

    this.navbarOpen = false;
    this.sidebarOpen = false;
    if(this.username === null){
      this.router.navigateByUrl('/login');
     }else{
       this.router.navigateByUrl('/');
     }
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(){
    this.authService.clearStorage();
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(){
    this.username = this.authService.getUserName();
    return this.username === null;
  }
}