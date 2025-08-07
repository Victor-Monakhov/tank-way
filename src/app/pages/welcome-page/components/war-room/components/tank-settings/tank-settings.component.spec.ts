import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankSettingsComponent } from './tank-settings.component';

describe('TankSettingsComponent', () => {
  let component: TankSettingsComponent;
  let fixture: ComponentFixture<TankSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TankSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
