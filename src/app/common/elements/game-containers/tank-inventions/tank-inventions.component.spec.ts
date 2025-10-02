import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankInventionsComponent } from './tank-inventions.component';

describe('TankInventionsComponent', () => {
  let component: TankInventionsComponent;
  let fixture: ComponentFixture<TankInventionsComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TankInventionsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TankInventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
