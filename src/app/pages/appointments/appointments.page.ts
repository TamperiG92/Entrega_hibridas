import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


import{
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
  IonText
} from '@ionic/angular';

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
  IonText
]
})
export class AppointmentsPage {
  activeAppointments: Appointment[] = [
    {
      id: 1,
      service: 'Corte con navaja premium',
      professional: 'Mateo · Barbería',
      date: 'Jueves 29',
      time: '10:30 AM',
      duration: '45 min',
      status: 'Confirmado',
      accent: 'confirmed',
    },
    {
      id: 2,
      service: 'Manicure + Spa de uñas',
      professional: 'Valeria · Nails Studio',
      date: 'Viernes 30',
      time: '1:15 PM',
      duration: '60 min',
      status: 'En Atención',
      accent: 'in-progress',
    },
  ];

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

  constructor(private readonly router: Router) {}

  goToSchedule() {
    this.router.navigateByUrl('/schedule');
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

