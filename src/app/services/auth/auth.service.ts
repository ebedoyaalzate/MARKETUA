import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Platform } from "@ionic/angular";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<firebase.User>;
  public userIdToken: string;
  public userDetails: any;
  
  constructor(
    public afAuth: AngularFireAuth,
    private gPlus: GooglePlus,
    private platform: Platform,
    public router: Router) 
    {
      this.user = this.afAuth.authState

     this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.userIdToken = user['ma'];
          console.log(this.userIdToken);
        }
        else {
          this.userDetails = null;
        }
      }
    );
   }
   
     googleLogin() {
      if(this.platform.is('cordova')) {
        this.nativeGoogleLogin()
        .catch((err)=> console.log(err));;
      } else {
        this.webGoogleLogin()
        .catch((err)=> console.log(err));
      }
    }
  
    async nativeGoogleLogin(){
      try {
        const gPlusUser = await this.gPlus.login({
          'webClientId': '1094856102481-phn3qb7424npnk56prhujpko4b0tp19i.apps.googleusercontent.com',
          'offline': true,
          'scopes': 'profile email'
        });
        return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gPlusUser.idToken))
        .then(() =>{
            this.router.navigate(["/home"]);
          });
      } catch(err) {
        console.log(err); 
      }
    }
  
    async webGoogleLogin(){
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        return await this.afAuth.auth.signInWithPopup(provider)
          .then(() =>{
            this.router.navigate(["/home"]);
          });
      } catch(err) {
        console.log(err)
      }
    }

    logout() {
        this.afAuth.auth.signOut()
        .then((res) => this.router.navigate(['/']));
    }
}
