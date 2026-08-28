import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceSelectionPage } from './service-selection.page';

describe('ServiceSelectionPage', () => {
  let component: ServiceSelectionPage;
  let fixture: ComponentFixture<ServiceSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
