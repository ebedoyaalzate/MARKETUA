import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userDetail: any;

  constructor(
    private router: Router,
    public authService: AuthService) {
      
   }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      console.log("Estoy en login voy para home");
      
      this.router.navigate(['/home']);
    }
  }


  googleLogin() {
    this.authService.googleLogin()
  }
  
}
