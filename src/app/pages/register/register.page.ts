import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSegment,
  IonSegmentButton,
  IonCheckbox
} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
    IonSegment,
    IonSegmentButton,
    IonCheckbox
  ]
})
export class RegisterPage {
  userType: 'cliente' | 'especialista' = 'cliente';
  fullName: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  acceptedTerms: boolean = false;
  errorMessage: string = '';

constructor(private readonly router: Router) {}  

  onSegmentChange(event: CustomEvent) {
    this.userType = event.detail.value;
  }

  onRegister() {
    this.errorMessage = '';

    if (!this.fullName || !this.phone || !this.email || !this.password) {
      this.errorMessage = 'Completa todos los campos para continuar';
      return;
    }

    if (!this.acceptedTerms) {
      this.errorMessage = 'Debes aceptar los términos y condiciones';
      return;
    }

    console.log('Register intent:', { fullName: this.fullName, email: this.email, userType: this.userType });
    this.router.navigateByUrl('/service-selection');
  }
}