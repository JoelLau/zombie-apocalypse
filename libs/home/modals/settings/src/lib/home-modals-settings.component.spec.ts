import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeModalsSettingsComponent } from './home-modals-settings.component';

describe('HomeModalsSettingsComponent', () => {
  let component: HomeModalsSettingsComponent;
  let fixture: ComponentFixture<HomeModalsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeModalsSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeModalsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
