import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankShopsComponent } from './tank-shops.component';

describe('TankShopsComponent', () => {
  let component: TankShopsComponent;
  let fixture: ComponentFixture<TankShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TankShopsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
