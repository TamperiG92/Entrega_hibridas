/**
 * ============================================================================
 *  PUNTO E — Pantalla "Servicios Agendados e Historial"
 * ============================================================================
 *
 *  Rol dentro del flujo de la app (Velvet & Blade):
 *
 *      Punto D (Confirmar Horario)  ──▶  [ ESTA PANTALLA ]
 *                                            │
 *                                            └─▶ "Nueva" ──▶ Punto C (nuevo agendamiento)
 *
 *  Qué muestra:
 *    - ACTIVAS: las citas que el usuario acaba de confirmar en el Punto D.
 *      Se leen de localStorage["vb_appointments"] (las escribe el Punto D).
 *    - HISTORIAL: citas pasadas (completadas / canceladas). Hoy son datos de
 *      demostración hardcodeados; con backend vendrán del servidor.
 *
 *  Origen y destino de los datos (ver también FLUJO-DE-DATOS.md):
 *
 *    localStorage["vb_current_user"]  ──lee──▶  saludo con el nombre
 *    localStorage["vb_appointments"]  ──lee──▶  lista "Activas"
 *
 *  Esta pantalla NO escribe en localStorage.
 * ============================================================================
 */

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
  IonText
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addOutline,
  calendarOutline,
  timeOutline,
  hourglassOutline
} from 'ionicons/icons';

/** Estados por los que pasa una cita. */
type AppointmentStatus = 'Confirmado' | 'En Atención' | 'Completado' | 'Cancelado';

/**
 * Forma "aplanada" de una cita, tal cual la escribe el Punto D en
 * localStorage["vb_appointments"] y la consume este template.
 */
interface Appointment {
  id: number;
  service: string;
  professional: string;
  date: string;
  time: string;
  duration: string;
  status: AppointmentStatus;
  /** Clave de color para el badge de estado (ver getStatusClass / SCSS). */
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
    IonText
  ]
})
export class AppointmentsPage implements OnInit {
  /** Nombre de pila del usuario para el saludo. Se rellena en ngOnInit. */
  userName = '';

  /**
   * Citas activas. Se rellena en ngOnInit desde localStorage["vb_appointments"];
   * empieza vacío para que la vista muestre el estado "sin citas" si no hay nada.
   */
  activeAppointments: Appointment[] = [];

  /**
   * Historial de demostración (datos hardcodeados). Con backend vendrá del
   * servidor filtrado por usuario. No se persiste ni se modifica aquí.
   */
  historyAppointments: Appointment[] = [
    {
      id: 3,
      service: 'Afeitado clásico',
      professional: 'Mateo · Barbería',
      date: 'Lunes 26',
      time: '9:00 AM',
      duration: '30 min',
      status: 'Completado',
      accent: 'completed'
    },
    {
      id: 4,
      service: 'Pedicure hidratante',
      professional: 'Sofía · Spa',
      date: 'Miércoles 21',
      time: '4:00 PM',
      duration: '50 min',
      status: 'Cancelado',
      accent: 'cancelled'
    }
  ];

  constructor(private readonly router: Router) {
    addIcons({ addOutline, calendarOutline, timeOutline, hourglassOutline });
  }

  /**
   * Ciclo de vida: única LECTURA de datos externos.
   *   1. `vb_current_user`  → nombre para el saludo.
   *   2. `vb_appointments`  → lista de citas activas (las creó el Punto D).
   * Ambos bloques en try/catch (JSON corrupto / localStorage no disponible).
   */
  ngOnInit(): void {
    try {
      const raw = localStorage.getItem('vb_current_user');
      if (raw) {
        const parsed = JSON.parse(raw);
        this.userName = (parsed?.name || '').split(' ')[0] || '';
      }
    } catch { /* sin saludo */ }

    try {
      const raw = localStorage.getItem('vb_appointments');
      if (raw) {
        const list = JSON.parse(raw);
        // Se confía en la forma que escribe el Punto D, pero se filtra por si
        // hubiera entradas corruptas de una versión anterior.
        this.activeAppointments = Array.isArray(list)
          ? list.filter((a: Appointment) => a && a.service && a.time)
          : [];
      }
    } catch { /* sin citas activas */ }
  }

  /** ¿Hay al menos una cita activa? Lo usa el template para el estado vacío. */
  get hasActive(): boolean {
    return this.activeAppointments.length > 0;
  }

  /** Empezar un nuevo agendamiento → vuelve al Punto C (elegir servicio). */
  newBooking(): void {
    this.router.navigateByUrl('/service-selection');
  }

  /** Traduce el estado de una cita a la clase CSS de su badge. */
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
