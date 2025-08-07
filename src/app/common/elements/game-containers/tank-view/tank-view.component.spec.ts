import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankViewComponent } from './tank-view.component';

describe('TankViewComponent', () => {
  let component: TankViewComponent;
  let fixture: ComponentFixture<TankViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TankViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
