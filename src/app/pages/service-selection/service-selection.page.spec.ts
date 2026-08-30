import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ServiceSelectionPage } from './service-selection.page';

describe('ServiceSelectionPage', () => {
  let component: ServiceSelectionPage;
  let fixture: ComponentFixture<ServiceSelectionPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])]
    });
    fixture = TestBed.createComponent(ServiceSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe filtrar servicios por la categoria activa', () => {
    component.setCategory('unas');
    expect(component.filteredServices.every(s => s.category === 'unas')).toBe(true);
  });

  it('al elegir servicio se limpia la estacion seleccionada', () => {
    const service = component.services[0];
    component.selectService(service);
    expect(component.selectedService).toBe(service);
    expect(component.selectedStation).toBeNull();
  });

  it('no permite seleccionar una estacion ocupada', () => {
    const busy = component.stations.find(s => s.status === 'ocupado');
    if (busy) {
      component.selectStation(busy);
      expect(component.selectedStation).toBeNull();
    }
  });
});
