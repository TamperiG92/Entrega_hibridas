import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  cutOutline,
  colorPaletteOutline,
  timeOutline,
  cashOutline,
  sparklesOutline,
  star,
  personOutline,
  checkmarkCircle,
  arrowForwardOutline,
  informationCircleOutline,
  chevronForwardOutline,
  pinOutline,
  shieldCheckmarkOutline,
  storefrontOutline,
  searchOutline
} from 'ionicons/icons';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'barberia' | 'unas';
  categoryLabel: string;
  description: string;
  duration: number;
  price: number;
  badge?: string;
  iconName: string;
  includes: string[];
}

export interface Workstation {
  id: string;
  name: string;
  type: 'barberia' | 'unas';
  number: number;
  status: 'disponible' | 'ocupado' | 'reservado';
  description: string;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  type: 'barberia' | 'unas';
  rating: number;
  reviewsCount: number;
  available: boolean;
  avatarColor: string;
}

@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.page.html',
  styleUrls: ['./service-selection.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonIcon
  ]
})
export class ServiceSelectionPage implements OnInit {
  activeCategory: 'barberia' | 'unas' = 'barberia';
  searchQuery: string = '';

  selectedService: ServiceItem | null = null;
  selectedStation: Workstation | null = null;
  selectedSpecialist: Specialist | null = null;
  currentUserName: string = 'Cliente VIP';
  currentUserInitials: string = 'VIP';

  services: ServiceItem[] = [
    {
      id: 'b1',
      name: 'Corte Signature Velvet',
      category: 'barberia',
      categoryLabel: 'Barbería de Autor',
      description: 'Corte personalizado con tijera y máquina, lavado con shampoo de carbón activo y peinado final con pomada mate.',
      duration: 45,
      price: 45000,
      badge: 'Más Popular',
      iconName: 'cut-outline',
      includes: ['Lavado capilar premium', 'Asesoría de visagismo', 'Peinado final']
    },
    {
      id: 'b2',
      name: 'Perfilado de Barba & Toalla Caliente',
      category: 'barberia',
      categoryLabel: 'Barbería de Autor',
      description: 'Ritual tradicional con doble toalla al vapor, aceites esenciales de cedro, navaja clásica y bálsamo hidratante.',
      duration: 35,
      price: 38000,
      badge: 'Ritual Exclusivo',
      iconName: 'sparkles-outline',
      includes: ['Toalla caliente aromática', 'Afeitado navaja al filo', 'Masaje facial']
    },
    {
      id: 'b3',
      name: 'Combo Imperial (Corte + Barba)',
      category: 'barberia',
      categoryLabel: 'Barbería de Autor',
      description: 'La experiencia completa de Velvet & Blade: Corte de autor + ritual completo de barba con masaje relajante.',
      duration: 75,
      price: 75000,
      badge: 'Mejor Valor',
      iconName: 'star',
      includes: ['Corte completo', 'Barba con toalla vapor', 'Tratamiento capilar express']
    },
    {
      id: 'b4',
      name: 'Ritual Facial Detox & Black Mask',
      category: 'barberia',
      categoryLabel: 'Barbería de Autor',
      description: 'Limpieza profunda de poros, exfoliación con micro-gránulos de café, mascarilla purificante y tónico refrescante.',
      duration: 40,
      price: 52000,
      badge: 'Cuidado Facial',
      iconName: 'sparkles-outline',
      includes: ['Vapor de ozono', 'Extracción suave', 'Hidratación con ácido hialurónico']
    },

    {
      id: 'u1',
      name: 'Manicura Rusa Express',
      category: 'unas',
      categoryLabel: 'Spa de Uñas',
      description: 'Limpieza milimétrica de cutícula con torno diamantado, nivelación de lámina ungueal y acabado ultra limpio.',
      duration: 50,
      price: 50000,
      badge: 'Top Solicitado',
      iconName: 'color-palette-outline',
      includes: ['Técnica con torno ruso', 'Exfoliación de manos', 'Aceite hidratante de argán']
    },
    {
      id: 'u2',
      name: 'Esmaltado Semipermanente Gel',
      category: 'unas',
      categoryLabel: 'Spa de Uñas',
      description: 'Manicura completa con esmaltado en gel curado con lámpara LED UV. Brillo impecable por más de 21 días.',
      duration: 60,
      price: 65000,
      badge: 'Larga Duración',
      iconName: 'sparkles-outline',
      includes: ['Preparación rusa', 'Gama de +120 tonos', 'Capa protectora Ultra Gloss']
    },
    {
      id: 'u3',
      name: 'Pedicura Spa Deluxe',
      category: 'unas',
      categoryLabel: 'Spa de Uñas',
      description: 'Tina de hidromasaje con sales marinas aromáticas, exfoliación, remoción de callosidades, mascarilla térmica y esmaltado.',
      duration: 70,
      price: 72000,
      badge: 'Relax Total',
      iconName: 'sparkles-outline',
      includes: ['Hidromasaje con sales', 'Masaje reflexológico', 'Exfoliación e hidratación']
    },
    {
      id: 'u4',
      name: 'Esculpido en Polygel Velvet',
      category: 'unas',
      categoryLabel: 'Spa de Uñas',
      description: 'Extensión y esculpido de uñas con técnica híbrida polygel ultra ligera y resistente con diseño a elección.',
      duration: 90,
      price: 110000,
      badge: 'Alta Gama',
      iconName: 'star',
      includes: ['Esculpido a medida', 'Esmaltado en gel incluido', 'Nail Art básico']
    }
  ];

  workstations: Workstation[] = [
    {
      id: 'st1',
      name: 'Sillón Master Barber 01',
      type: 'barberia',
      number: 1,
      status: 'disponible',
      description: 'Sillón reclinable hidráulico de cuero capitoneado con espejo iluminado LED.'
    },
    {
      id: 'st2',
      name: 'Sillón Clásico Imperial 02',
      type: 'barberia',
      number: 2,
      status: 'disponible',
      description: 'Estación con vaporizador de ozono y toallero térmico dedicado.'
    },
    {
      id: 'st3',
      name: 'Sillón VIP Signature 03',
      type: 'barberia',
      number: 3,
      status: 'disponible',
      description: 'Zona reservada privada con minibar de cortesía y aislamiento acústico.'
    },
    {
      id: 'st4',
      name: 'Mesa Nail Rose Gold 01',
      type: 'unas',
      number: 1,
      status: 'disponible',
      description: 'Mesa ergonómica con extractor de polvo integrado y lámpara SunUV pro.'
    },
    {
      id: 'st5',
      name: 'Mesa Velvet Diamond 02',
      type: 'unas',
      number: 2,
      status: 'disponible',
      description: 'Estación con apoyabrazos acolchado de terciopelo y torno SilentPro.'
    },
    {
      id: 'st6',
      name: 'Sillón Pedicura Spa Relax 03',
      type: 'unas',
      number: 3,
      status: 'disponible',
      description: 'Sillón de masaje Shiatsu con tina de hidromasaje y cromoterapia.'
    }
  ];

  specialists: Specialist[] = [
    {
      id: 'sp1',
      name: 'Carlos "Blade" Mendoza',
      role: 'Master Barber & Visagista',
      type: 'barberia',
      rating: 4.95,
      reviewsCount: 142,
      available: true,
      avatarColor: 'linear-gradient(135deg, #C9184A 0%, #800F2F 100%)'
    },
    {
      id: 'sp2',
      name: 'Mateo Restrepo',
      role: 'Especialista en Barbas y Ritual',
      type: 'barberia',
      rating: 4.88,
      reviewsCount: 98,
      available: true,
      avatarColor: 'linear-gradient(135deg, #701A75 0%, #3B1235 100%)'
    },
    {
      id: 'sp3',
      name: 'Valentina Morales',
      role: 'Master Nail Artist (Técnica Rusa)',
      type: 'unas',
      rating: 4.98,
      reviewsCount: 185,
      available: true,
      avatarColor: 'linear-gradient(135deg, #C9184A 0%, #D4AF37 100%)'
    },
    {
      id: 'sp4',
      name: 'Camila Sandoval',
      role: 'Especialista en Polygel & Spa',
      type: 'unas',
      rating: 4.92,
      reviewsCount: 120,
      available: true,
      avatarColor: 'linear-gradient(135deg, #701A75 0%, #C9184A 100%)'
    }
  ];

  constructor(private readonly router: Router) {
    addIcons({
      cutOutline,
      colorPaletteOutline,
      timeOutline,
      cashOutline,
      sparklesOutline,
      star,
      personOutline,
      checkmarkCircle,
      arrowForwardOutline,
      informationCircleOutline,
      chevronForwardOutline,
      pinOutline,
      shieldCheckmarkOutline,
      storefrontOutline,
      searchOutline
    });
  }

  ngOnInit() {
    this.loadCurrentUser();
    this.setDefaultSelections();
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

  setDefaultSelections() {
    const firstService = this.filteredServices[0];
    if (firstService) {
      this.selectedService = firstService;
    }
    const firstStation = this.filteredStations[0];
    if (firstStation) {
      this.selectedStation = firstStation;
    }
    const firstSpecialist = this.filteredSpecialists[0];
    if (firstSpecialist) {
      this.selectedSpecialist = firstSpecialist;
    }
  }

  async triggerHaptic() {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch {
    }
  }

  setCategory(cat: 'barberia' | 'unas') {
    if (this.activeCategory !== cat) {
      this.activeCategory = cat;
      this.triggerHaptic();
      this.setDefaultSelections();
    }
  }

  get filteredServices(): ServiceItem[] {
    return this.services.filter(s => {
      const matchesCategory = s.category === this.activeCategory;
      const matchesSearch = this.searchQuery
        ? s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }

  get filteredStations(): Workstation[] {
    return this.workstations.filter(st => st.type === this.activeCategory);
  }

  get filteredSpecialists(): Specialist[] {
    return this.specialists.filter(sp => sp.type === this.activeCategory);
  }

  selectService(service: ServiceItem) {
    this.selectedService = service;
    this.triggerHaptic();
  }

  selectStation(station: Workstation) {
    this.selectedStation = station;
    this.triggerHaptic();
  }

  selectSpecialist(specialist: Specialist) {
    this.selectedSpecialist = specialist;
    this.triggerHaptic();
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price);
  }

  proceedToScheduling() {
    this.triggerHaptic();
    console.log('Proceeding to Schedule with:', {
      service: this.selectedService,
      station: this.selectedStation,
      specialist: this.selectedSpecialist
    });
    alert(`¡Selección confirmada!\n\nServicio: ${this.selectedService?.name}\nEstación: ${this.selectedStation?.name}\nEspecialista: ${this.selectedSpecialist?.name}\nTotal: ${this.formatPrice(this.selectedService?.price || 0)}\n\nListo para continuar al Punto D: Revisar Horario y Disponibilidad.`);
  }

  goToLogin() {
    this.triggerHaptic();
    this.router.navigateByUrl('/login');
  }
}

