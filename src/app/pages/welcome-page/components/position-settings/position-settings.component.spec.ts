import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionSettingsComponent } from './position-settings.component';

describe('PositionSettingsComponent', () => {
  let component: PositionSettingsComponent;
  let fixture: ComponentFixture<PositionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
