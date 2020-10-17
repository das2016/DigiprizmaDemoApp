import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from '../signup/signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 
  signupRequestPaload: SignupRequestPayload;
  signupForm : FormGroup;
  signupErrorMessage : string;
  isError : boolean;
  constructor(private authService: AuthService,private router: Router) { 
    this.signupRequestPaload = {
      username:'',
      password:'',
      email:''
    }
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        username: new FormControl('',Validators.required),
        password: new FormControl('',Validators.required),
        email: new FormControl('',[Validators.required, Validators.email]),
      }
    )
  }

  signup(){
    this.signupRequestPaload.username = this.signupForm.get('username').value;
    this.signupRequestPaload.password = this.signupForm.get('password').value;
    this.signupRequestPaload.email = this.signupForm.get('email').value;

    if(this.signupForm.get('username').invalid || this.signupForm.get('password').invalid || this.signupForm.get('email').invalid) {
      this.isError = true;
      this.signupErrorMessage = "Email , utilisateur et mot de passe sont obligatoires.";
      return;
    }

    this.authService.signup(this.signupRequestPaload).subscribe(data => {
      this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
    }, () => {
      this.isError = true;
      this.signupErrorMessage = 'Échec de l\'inscription ! Veuillez réessayer ';
     console.error('Échec de l\'inscription ! Veuillez réessayer ');
    });
  }
}