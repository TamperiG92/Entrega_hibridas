import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  cutOutline,
  colorPaletteOutline,
  sparklesOutline,
  happyOutline,
  flameOutline,
  handLeftOutline,
  footstepsOutline,
  brushOutline,
  timeOutline,
  arrowForwardOutline,
  checkmarkCircle,
  checkmarkOutline,
  personOutline,
  star,
  calendarOutline
} from 'ionicons/icons';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

type Category = 'barberia' | 'unas';
type StationStatus = 'disponible' | 'ocupado';

interface Service {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  price: string;
  category: Category;
  icon: string;
}

interface Station {
  id: string;
  name: string;
  professional: string;
  initials: string;
  role: string;
  category: Category;
  status: StationStatus;
  rating: number;
}

@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.page.html',
  styleUrls: ['./service-selection.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon]
})
export class ServiceSelectionPage implements OnInit {
  userName = '';
  activeCategory: Category = 'barberia';
  selectedService: Service | null = null;
  selectedStation: Station | null = null;

  readonly categoryLabels: Record<Category, string> = {
    barberia: 'Barbería de Autor',
    unas: 'Spa de Uñas'
  };

  readonly services: Service[] = [
    {
      id: 'corte-precision',
      name: 'Corte de Precisión',
      description: 'Corte de autor personalizado con acabado a navaja y styling final.',
      durationMin: 45,
      price: '$45.000',
      category: 'barberia',
      icon: 'cut-outline'
    },
    {
      id: 'perfilado-barba',
      name: 'Perfilado de Barba',
      description: 'Diseño de barba, alineado con toalla caliente y aceites nutritivos.',
      durationMin: 30,
      price: '$30.000',
      category: 'barberia',
      icon: 'sparkles-outline'
    },
    {
      id: 'ritual-toalla',
      name: 'Ritual de Toalla Caliente',
      description: 'Afeitado clásico completo con vapor, toalla caliente y masaje facial.',
      durationMin: 40,
      price: '$38.000',
      category: 'barberia',
      icon: 'flame-outline'
    },
    {
      id: 'tratamiento-facial',
      name: 'Tratamiento Facial',
      description: 'Limpieza profunda, exfoliación e hidratación para piel de hombre.',
      durationMin: 50,
      price: '$55.000',
      category: 'barberia',
      icon: 'happy-outline'
    },
    {
      id: 'manicura-rusa',
      name: 'Manicura Rusa',
      description: 'Trabajo de cutícula en seco con torno y esmaltado de larga duración.',
      durationMin: 60,
      price: '$50.000',
      category: 'unas',
      icon: 'hand-left-outline'
    },
    {
      id: 'pedicura-spa',
      name: 'Pedicura Spa',
      description: 'Inmersión aromática, exfoliación, masaje y esmaltado profesional.',
      durationMin: 70,
      price: '$60.000',
      category: 'unas',
      icon: 'footsteps-outline'
    },
    {
      id: 'esmaltado-permanente',
      name: 'Esmaltado Permanente',
      description: 'Aplicación de esmalte semipermanente con secado LED y brillo espejo.',
      durationMin: 45,
      price: '$40.000',
      category: 'unas',
      icon: 'brush-outline'
    }
  ];

  readonly stations: Station[] = [
    {
      id: 'sillon-1',
      name: 'Sillón 1',
      professional: 'Mateo Rivas',
      initials: 'MR',
      role: 'Barbero de Autor',
      category: 'barberia',
      status: 'disponible',
      rating: 4.9
    },
    {
      id: 'sillon-2',
      name: 'Sillón 2',
      professional: 'Julián Ossa',
      initials: 'JO',
      role: 'Barber Senior',
      category: 'barberia',
      status: 'disponible',
      rating: 4.8
    },
    {
      id: 'sillon-3',
      name: 'Sillón 3',
      professional: 'Andrés Kem',
      initials: 'AK',
      role: 'Especialista en Barba',
      category: 'barberia',
      status: 'ocupado',
      rating: 4.7
    },
    {
      id: 'mesa-1',
      name: 'Mesa 1',
      professional: 'Valentina Ruiz',
      initials: 'VR',
      role: 'Nail Artist Master',
      category: 'unas',
      status: 'disponible',
      rating: 5.0
    },
    {
      id: 'mesa-2',
      name: 'Mesa 2',
      professional: 'Camila Soto',
      initials: 'CS',
      role: 'Manicurista Rusa',
      category: 'unas',
      status: 'ocupado',
      rating: 4.8
    },
    {
      id: 'mesa-3',
      name: 'Mesa 3',
      professional: 'Daniela Franco',
      initials: 'DF',
      role: 'Pedicura Spa',
      category: 'unas',
      status: 'disponible',
      rating: 4.9
    }
  ];

  constructor(private readonly router: Router) {
    addIcons({
      cutOutline,
      colorPaletteOutline,
      sparklesOutline,
      happyOutline,
      flameOutline,
      handLeftOutline,
      footstepsOutline,
      brushOutline,
      timeOutline,
      arrowForwardOutline,
      checkmarkCircle,
      checkmarkOutline,
      personOutline,
      star,
      calendarOutline
    });
  }

  ngOnInit(): void {
    try {
      const raw = localStorage.getItem('vb_current_user');
      if (raw) {
        const parsed = JSON.parse(raw);
        this.userName = (parsed?.name || '').split(' ')[0] || '';
      }
    } catch { }

    // Restaura una selección previa si el usuario regresa a esta pantalla
    try {
      const raw = localStorage.getItem('vb_selected_service');
      if (raw) {
        const saved = JSON.parse(raw);
        const svc = this.services.find(s => s.id === saved?.serviceId);
        const st = this.stations.find(x => x.id === saved?.stationId);
        if (svc) {
          this.selectedService = svc;
          this.activeCategory = svc.category;
        }
        if (st && st.status === 'disponible') {
          this.selectedStation = st;
        }
      }
    } catch { }
  }

  get filteredServices(): Service[] {
    return this.services.filter(s => s.category === this.activeCategory);
  }

  get filteredStations(): Station[] {
    const cat = this.selectedService?.category ?? this.activeCategory;
    return this.stations.filter(s => s.category === cat);
  }

  get availableStationsCount(): number {
    return this.filteredStations.filter(s => s.status === 'disponible').length;
  }

  categoryLabel(cat: Category): string {
    return this.categoryLabels[cat];
  }

  async triggerHaptic(): Promise<void> {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch { }
  }

  setCategory(cat: Category): void {
    if (this.activeCategory === cat) {
      return;
    }
    this.activeCategory = cat;
    this.triggerHaptic();
  }

  selectService(service: Service): void {
    if (this.selectedService?.id === service.id) {
      return;
    }
    this.selectedService = service;
    this.selectedStation = null;
    this.activeCategory = service.category;
    this.triggerHaptic();
  }

  selectStation(station: Station): void {
    if (station.status === 'ocupado' || this.selectedStation?.id === station.id) {
      return;
    }
    this.selectedStation = station;
    this.triggerHaptic();
  }

  continue(): void {
    if (!this.selectedService || !this.selectedStation) {
      return;
    }
    this.triggerHaptic();
    try {
      localStorage.setItem('vb_selected_service', JSON.stringify({
        serviceId: this.selectedService.id,
        serviceName: this.selectedService.name,
        durationMin: this.selectedService.durationMin,
        price: this.selectedService.price,
        category: this.selectedService.category,
        stationId: this.selectedStation.id,
        stationName: this.selectedStation.name,
        professional: this.selectedStation.professional
      }));
    } catch { }
    // Punto D (Revisar Horario y Disponibilidad)
    this.router.navigateByUrl('/schedule');
  }
}
