import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  password: string = '';
  username: string = '';
  loginValid: boolean = true;

  constructor(
    private authService: AuthService,
    private routerService: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService
      .login({ id: this.username, password: this.password })
      .subscribe({
        next: (res: any) => {
          console.log('respuesta login', res);
          if (res.token) {
            this.loginValid = true;
            this.authService.saveLoginToken(res.token, res.userId);
            console.log('Usuario loggeado', res);
          } else {
            this.loginValid = false;
            console.log('Login fallido');
          }
        },
        complete: () => {
          this.routerService.navigate(['/admin']);
        }, // completeHandler
        error: (err) => {
          console.log('Error login', err);
        }, // errorHandler
      });
  }
}
