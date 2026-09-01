import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestStandalonePage } from './test-standalone.page';

describe('TestStandalonePage', () => {
  let component: TestStandalonePage;
  let fixture: ComponentFixture<TestStandalonePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStandalonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
