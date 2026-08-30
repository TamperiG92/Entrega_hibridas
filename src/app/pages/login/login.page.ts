import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonIcon,
} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonIcon,
  ],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private readonly router: Router) {}

  onLogin() {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Completa correo y contraseña para continuar';
      return;
    }

    console.log('Login intent:', this.email);
    this.router.navigateByUrl('/service-selection');
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}