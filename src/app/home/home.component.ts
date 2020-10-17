import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username:string;
  date:string;

  constructor(private authService: AuthService, private router:Router) {
    this.username = authService.getUserName();
   }

  ngOnInit(): void {
    this.date = Date();
  }

}