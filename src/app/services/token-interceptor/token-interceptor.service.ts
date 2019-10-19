import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  tockenizedReq: any;

  constructor(private authService:AuthService) { }

  intercept(req, next) {
    this.tockenizedReq = req.clone({
      setHeaders: {
        IdToken: `${this.authService.userIdToken}`
      }
    });
    return next.handle(this.tockenizedReq);
  }
}