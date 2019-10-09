import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import  * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Platform } from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //user: Observable<firebase.User>

  constructor(
    private afAuth: AngularFireAuth,
    private gPlus: GooglePlus,
    private platform: Platform) {

   }

  ngOnInit() {
  }

  googleLogin() {
    if(this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gPlusUser = await this.gPlus.login({
        'webClientId': '1094856102481-phn3qb7424npnk56prhujpko4b0tp19i.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });
      await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gPlusUser.idToken))
    }
    catch(err) {
      console.log(err);
      
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.auth.signInWithPopup(provider);
  
    } catch(err) {
      console.log(err)
    }
  
  }

}
