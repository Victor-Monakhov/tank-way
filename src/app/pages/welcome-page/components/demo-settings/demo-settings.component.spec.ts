import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSettingsComponent } from './demo-settings.component';

describe('DemoSettingsComponent', () => {
  let component: DemoSettingsComponent;
  let fixture: ComponentFixture<DemoSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
