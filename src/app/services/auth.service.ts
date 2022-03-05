import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLogged = new Subject<boolean>();
  readonly URL_API = this.config.getConfig().backend.url;

  constructor(
    private http: HttpClient,
    private routerService: Router,
    private config: ConfigService
  ) {}

  login(loginData: any) {
    return this.http.post(this.URL_API + '/empleado/login', loginData);
  }

  isLoggedObserver(): Observable<boolean> {
    return this._isLogged.asObservable();
  }

  isLogged() {
    return localStorage.getItem('token') ? true : false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('user');
  }

  saveLoginToken(token: string, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    this._isLogged.next(this.isLogged());
  }

  logout() {
    localStorage.removeItem('token');
    this._isLogged.next(this.isLogged());
    this.routerService.navigate(['/']);
  }
}
