import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addOutline,
  calendarOutline,
  hourglassOutline,
  timeOutline, logOutOutline } from 'ionicons/icons';

type AppointmentStatus = 'Confirmado' | 'En Atención' | 'Completado' | 'Cancelado';

interface Appointment {
  id: number;
  service: string;
  professional: string;
  date: string;
  time: string;
  duration: string;
  status: AppointmentStatus;
  accent: string;
  price?: string;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonChip,
    IonIcon,
    IonItem,
    IonLabel,
    IonText,
  ],
})
export class AppointmentsPage implements OnInit {
  userName = '';
  activeAppointments: Appointment[] = [];
  historyAppointments: Appointment[] = [
    {
      id: 3,
      service: 'Afeitado clásico',
      professional: 'Mateo · Barbería',
      date: 'Lunes 26',
      time: '9:00 AM',
      duration: '30 min',
      status: 'Completado',
      accent: 'completed',
    },
    {
      id: 4,
      service: 'Pedicure hidratante',
      professional: 'Sofía · Spa',
      date: 'Miércoles 21',
      time: '4:00 PM',
      duration: '50 min',
      status: 'Cancelado',
      accent: 'cancelled',
    },
  ];

  constructor(private readonly router: Router) {
    addIcons({logOutOutline,addOutline,calendarOutline,timeOutline,hourglassOutline});
  }

  ngOnInit(): void {
    try {
      const raw = localStorage.getItem('vb_current_user');
      if (raw) {
        const parsed = JSON.parse(raw);
        this.userName = (parsed?.name || '').split(' ')[0] || '';
      }
    } catch {
      // sin saludo
    }

    try {
      const raw = localStorage.getItem('vb_appointments');
      if (raw) {
        const list = JSON.parse(raw);
        this.activeAppointments = Array.isArray(list)
          ? list.filter((a: Appointment) => a && a.service && a.time)
          : [];
      }
    } catch {
      // sin citas activas
    }
  }

  get hasActive(): boolean {
    return this.activeAppointments.length > 0;
  }

  newBooking(): void {
    this.router.navigateByUrl('/service-selection');
  }

  logout(): void {
    localStorage.removeItem('vb_current_user');
    localStorage.removeItem('vb_selected_service');
    localStorage.removeItem('vb_appointments');
    this.router.navigateByUrl('/login');
  }

  getStatusClass(status: AppointmentStatus): string {
    switch (status) {
      case 'Confirmado':
        return 'confirmed';
      case 'En Atención':
        return 'in-progress';
      case 'Completado':
        return 'completed';
      case 'Cancelado':
        return 'cancelled';
      default:
        return '';
    }
  }
}

