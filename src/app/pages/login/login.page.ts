import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userDetail: any;
  public user: Observable<firebase.User>;

  constructor(
    private router: Router,
    public authService: AuthService,
    public afAuth: AngularFireAuth) {

      this.user = this.afAuth.authState

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetail = user;
            this.router.navigate(['/home']);
          }
          else {
            this.userDetail = null;
          }
        }
      );
   }

  ngOnInit() {
  }

  googleLogin() {
    this.authService.googleLogin()
  }
  
}
