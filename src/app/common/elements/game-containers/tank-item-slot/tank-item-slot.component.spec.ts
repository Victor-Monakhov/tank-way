import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankItemSlotComponent } from './tank-item-slot.component';

describe('TankDetailContainerComponent', () => {
  let component: TankItemSlotComponent;
  let fixture: ComponentFixture<TankItemSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TankItemSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankItemSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
