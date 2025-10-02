import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankInventoryComponent } from './tank-inventory.component';

describe('TankInventoryComponent', () => {
  let component: TankInventoryComponent;
  let fixture: ComponentFixture<TankInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TankInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
