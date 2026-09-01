import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronForwardOutline,
  calendarOutline,
  timeOutline,
  checkmarkCircle,
  hourglassOutline,
  closeCircleOutline,
  personOutline,
  sparklesOutline,
  cutOutline
} from 'ionicons/icons';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export type AppointmentStatus = 'confirmado' | 'atencion' | 'completado' | 'cancelado';

export interface Appointment {
  id: string;
  clientName: string;
  serviceName: string;
  time: string;
  station: string;
  status: AppointmentStatus;
}

@Component({
  selector: 'app-specialist-home',
  templateUrl: './specialist-home.page.html',
  styleUrls: ['./specialist-home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonIcon
  ]
})
export class SpecialistHomePage implements OnInit {
  currentUserName: string = 'Especialista';
  currentUserInitials: string = 'ES';

  appointments: Appointment[] = [
    { id: 'a1', clientName: 'Andrés Peña', serviceName: 'Corte Signature Velvet', time: '9:00 AM', station: 'Sillón 01', status: 'completado' },
    { id: 'a2', clientName: 'Laura Gómez', serviceName: 'Manicura Rusa Express', time: '10:30 AM', station: 'Mesa 02', status: 'atencion' },
    { id: 'a3', clientName: 'Julián Ríos', serviceName: 'Combo Imperial', time: '11:30 AM', station: 'Sillón 03', status: 'confirmado' },
    { id: 'a4', clientName: 'Camila Duarte', serviceName: 'Pedicura Spa Deluxe', time: '1:00 PM', station: 'Sillón Spa', status: 'confirmado' },
    { id: 'a5', clientName: 'Felipe Ortiz', serviceName: 'Perfilado de Barba', time: '2:15 PM', station: 'Sillón 01', status: 'cancelado' }
  ];

  constructor(private readonly router: Router) {
    addIcons({
      chevronForwardOutline,
      calendarOutline,
      timeOutline,
      checkmarkCircle,
      hourglassOutline,
      closeCircleOutline,
      personOutline,
      sparklesOutline,
      cutOutline
    });
  }

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    try {
      const stored = localStorage.getItem('vb_current_user');
      if (stored) {
        const user = JSON.parse(stored);
        if (user.name) {
          this.currentUserName = user.name;
          const parts = user.name.trim().split(' ');
          this.currentUserInitials = parts.length > 1
            ? (parts[0][0] + parts[1][0]).toUpperCase()
            : user.name.slice(0, 2).toUpperCase();
        }
      }
    } catch { }
  }

  get pendingCount(): number {
    return this.appointments.filter(a => a.status === 'confirmado' || a.status === 'atencion').length;
  }

  get completedCount(): number {
    return this.appointments.filter(a => a.status === 'completado').length;
  }

  async triggerHaptic() {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch { }
  }

  statusLabel(status: AppointmentStatus): string {
    const labels: Record<AppointmentStatus, string> = {
      confirmado: 'Confirmado',
      atencion: 'En Atención',
      completado: 'Completado',
      cancelado: 'Cancelado'
    };
    return labels[status];
  }

  statusIcon(status: AppointmentStatus): string {
    const icons: Record<AppointmentStatus, string> = {
      confirmado: 'time-outline',
      atencion: 'hourglass-outline',
      completado: 'checkmark-circle',
      cancelado: 'close-circle-outline'
    };
    return icons[status];
  }

  markInProgress(appt: Appointment) {
    appt.status = 'atencion';
    this.triggerHaptic();
  }

  markCompleted(appt: Appointment) {
    appt.status = 'completado';
    this.triggerHaptic();
  }

  goToLogin() {
    this.triggerHaptic();
    localStorage.removeItem('vb_current_user');
    this.router.navigateByUrl('/login');
  }
}