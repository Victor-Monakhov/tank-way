import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSettingsPanelComponent } from './demo-settings-panel.component';

describe('DemoSettingsPanelComponent', () => {
  let component: DemoSettingsPanelComponent;
  let fixture: ComponentFixture<DemoSettingsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoSettingsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoSettingsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
