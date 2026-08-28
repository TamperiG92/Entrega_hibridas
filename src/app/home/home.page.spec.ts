import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { IonicModule } from '@ionic/angular/lazy';
=======
>>>>>>> 90c90f1895fb3fb9b812f35b6977a83543656de0

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
<<<<<<< HEAD
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

=======
>>>>>>> 90c90f1895fb3fb9b812f35b6977a83543656de0
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
