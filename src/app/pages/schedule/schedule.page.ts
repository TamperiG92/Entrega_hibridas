import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonIcon,
  IonLabel,
  IonNote,
  IonText
} from '@ionic/angular';

type SlotState = 'available' | 'occupied' | 'reserved';

interface ScheduleDay {
  id: number;
  label: string;
  dateNumber: number;
  slots: TimeSlot[];
}

interface TimeSlot {
  time: string;
  state: SlotState;
  guestName?: string;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,

    IonContent,
    IonButton,
    IonText,
    IonLabel,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonChip,
    IonNote
  ],
})
export class SchedulePage {

  selectedDate = 0;

  selectedSlot: TimeSlot | null = null;

  confirmedAppointment: string | null = null;


  days: ScheduleDay[] = [

    {
      id: 0,
      label: 'Hoy',
      dateNumber: 29,
      slots: [
        { time: '09:00', state: 'available' },
        { time: '09:45', state: 'occupied' },
        { time: '10:30', state: 'reserved', guestName: 'Ana' },
        { time: '11:15', state: 'available' },
        { time: '12:00', state: 'occupied' },
        { time: '13:30', state: 'available' },
        { time: '15:00', state: 'reserved', guestName: 'Luis' },
        { time: '16:15', state: 'available' },
      ],
    },

    {
      id: 1,
      label: 'Mié',
      dateNumber: 30,
      slots: [
        { time: '09:00', state: 'reserved', guestName: 'Carla' },
        { time: '09:45', state: 'available' },
        { time: '10:30', state: 'available' },
        { time: '11:15', state: 'occupied' },
        { time: '12:00', state: 'available' },
        { time: '13:30', state: 'available' },
        { time: '15:00', state: 'occupied' },
        { time: '16:15', state: 'reserved', guestName: 'Marco' },
      ],
    },

    {
      id: 2,
      label: 'Jue',
      dateNumber: 31,
      slots: [
        { time: '09:00', state: 'available' },
        { time: '09:45', state: 'available' },
        { time: '10:30', state: 'occupied' },
        { time: '11:15', state: 'available' },
        { time: '12:00', state: 'reserved', guestName: 'Sofía' },
        { time: '13:30', state: 'available' },
        { time: '15:00', state: 'occupied' },
        { time: '16:15', state: 'available' },
      ],
    },

    {
      id: 3,
      label: 'Vie',
      dateNumber: 1,
      slots: [
        { time: '09:00', state: 'available' },
        { time: '09:45', state: 'occupied' },
        { time: '10:30', state: 'available' },
        { time: '11:15', state: 'reserved', guestName: 'Diego' },
        { time: '12:00', state: 'available' },
        { time: '13:30', state: 'occupied' },
        { time: '15:00', state: 'available' },
        { time: '16:15', state: 'available' },
      ],
    },

    {
      id: 4,
      label: 'Sáb',
      dateNumber: 2,
      slots: [
        { time: '09:00', state: 'occupied' },
        { time: '09:45', state: 'available' },
        { time: '10:30', state: 'available' },
        { time: '11:15', state: 'reserved', guestName: 'Lucía' },
        { time: '12:00', state: 'available' },
        { time: '13:30', state: 'available' },
        { time: '15:00', state: 'occupied' },
        { time: '16:15', state: 'available' },
      ],
    },

  ];


  constructor(private readonly router: Router) {

    this.selectedSlot =
      this.getSelectedDay().slots.find(
        (slot) => slot.state === 'available'
      ) ?? null;

  }


  getSelectedDay(): ScheduleDay {
    return this.days[this.selectedDate];
  }


  selectDate(dayIndex: number) {

    this.selectedDate = dayIndex;

    this.selectedSlot =
      this.getSelectedDay().slots.find(
        (slot) => slot.state === 'available'
      ) ?? null;

    this.confirmedAppointment = null;
  }


  selectSlot(slot: TimeSlot) {

    if (slot.state !== 'available') {
      return;
    }

    this.selectedSlot = slot;

    this.confirmedAppointment = null;
  }


  confirmSelection() {

    if (!this.selectedSlot) {
      return;
    }

    const day = this.getSelectedDay();

    this.confirmedAppointment =
      `Cita confirmada para ${day.label} ${day.dateNumber} a las ${this.selectedSlot.time}`;
  }


  goBack() {

    this.router.navigateByUrl('/service-selection');

  }

}