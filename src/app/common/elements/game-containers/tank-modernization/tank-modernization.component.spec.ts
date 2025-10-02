import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankModernizationComponent } from './tank-modernization.component';

describe('TankModernizationComponent', () => {
  let component: TankModernizationComponent;
  let fixture: ComponentFixture<TankModernizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TankModernizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankModernizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
