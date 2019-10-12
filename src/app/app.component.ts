import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    public authService: AuthService,
    private router: Router,
    private fireAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.fireAuth.auth.onAuthStateChanged(user => {
        if (user) {
          this.router.navigate(["/home"]);
          this.splashScreen.hide();
        }
        else {
          this.router.navigate(["/login"]);
          this.splashScreen.hide();
        }
      })
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  closeMenu() {
    this.menu.enable(true, 'menu');
    this.menu.close('menu');
  }

  logout() {
    this.authService.logout();
    this.menu.enable(true, 'menu');
    this.menu.close('menu');
  }
}
