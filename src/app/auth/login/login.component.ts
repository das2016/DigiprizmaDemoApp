import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;
  loginErrorMessage: string;
  isError: boolean;

  constructor(private authService:AuthService, private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };

   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
     username: new FormControl('',Validators.required),
     password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
    .subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
       
        this.registerSuccessMessage = 'Please Check your inbox for activation email '
          + 'activate your account before you Login !';
      }
    });

  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    if(this.loginForm.get('username').invalid || this.loginForm.get('password').invalid) {
      this.isError = true;
      this.loginErrorMessage = "Utilisateur/mot de passe sont obligatoires.";
      return;
    }

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      if (data) {
         console.log("login ok ...")
        this.isError = false;
        this.router.navigateByUrl('/home');
       // this.toastr.success('Bienvenue '+this.loginRequestPayload.username);
      } else {
        console.log("login failed ...")
        this.isError = true;
        //this.toastr.error('Échec de la connexion');
        this.loginErrorMessage = "Veuillez vérifier vos informations et réessayer.";
        this.loginForm.reset();
      }
    },error => {console.log('oops', error)
   // this.toastr.error('Il y a une erreur de serveur, merci de réessayer plus tard');
  });
  }


}
