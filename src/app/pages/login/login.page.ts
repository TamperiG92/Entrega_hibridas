import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonIcon
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  sparklesOutline,
  arrowForwardOutline,
  shieldCheckmarkOutline,
  cutOutline,
  colorPaletteOutline,
  personOutline
} from 'ionicons/icons';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon
  ]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = true;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private readonly router: Router) {
    addIcons({
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      sparklesOutline,
      arrowForwardOutline,
      shieldCheckmarkOutline,
      cutOutline,
      colorPaletteOutline,
      personOutline
    });
  }

  async triggerHaptic() {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch {
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.triggerHaptic();
  }

  fillDemo(type: 'cliente' | 'especialista') {
    this.triggerHaptic();
    if (type === 'cliente') {
      this.email = 'cliente.vip@velvetblade.com';
      this.password = 'Velvet2026*';
    } else {
      this.email = 'master.barber@velvetblade.com';
      this.password = 'BladeMaster2026*';
    }
    this.errorMessage = '';
  }

  async onLogin() {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingresa tu correo y contraseña para ingresar';
      try {
        await Haptics.notification({ type: undefined as any });
      } catch { }
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Ingresa un formato de correo electrónico válido';
      return;
    }

    const defaultAccounts: Record<string, { password: string; userType: 'cliente' | 'especialista'; fullName: string }> = {
      'cliente.vip@velvetblade.com': { password: 'Velvet2026*', userType: 'cliente', fullName: 'Cliente VIP' },
      'master.barber@velvetblade.com': { password: 'BladeMaster2026*', userType: 'especialista', fullName: 'Master Barber' }
    };

    let localUsers: Array<{ email: string; password: string; fullName?: string; userType?: 'cliente' | 'especialista' }> = [];
    try {
      const stored = localStorage.getItem('vb_users');
      if (stored) {
        localUsers = JSON.parse(stored);
      }
    } catch { }

    const inputEmail = this.email.trim().toLowerCase();
    const registeredUser = localUsers.find(u => u.email.trim().toLowerCase() === inputEmail);
    const defaultAccount = defaultAccounts[inputEmail];
    const expectedPassword = registeredUser ? registeredUser.password : defaultAccount?.password;
    const resolvedUserType: 'cliente' | 'especialista' = registeredUser?.userType || defaultAccount?.userType || 'cliente';
    const resolvedName = registeredUser?.fullName || defaultAccount?.fullName || 'Usuario';

    if (!expectedPassword) {
      this.errorMessage = 'El correo electrónico no existe. Registra una cuenta para continuar.';
      try {
        await Haptics.notification({ type: undefined as any });
      } catch { }
      return;
    }

    if (this.password !== expectedPassword) {
      this.errorMessage = 'La contraseña ingresada no es correcta. Por favor verifica tus datos.';
      try {
        await Haptics.notification({ type: undefined as any });
      } catch { }
      return;
    }

    this.isLoading = true;
    this.triggerHaptic();

    try {
      localStorage.setItem('vb_current_user', JSON.stringify({
        email: inputEmail,
        name: resolvedName,
        userType: resolvedUserType
      }));
    } catch { }

    setTimeout(() => {
      this.isLoading = false;
      const destination = resolvedUserType === 'especialista' ? '/specialist-home' : '/service-selection';
      this.router.navigateByUrl(destination);
    }, 450);

  }

  goToRegister() {
    this.triggerHaptic();
    this.router.navigateByUrl('/register');
  }
}
