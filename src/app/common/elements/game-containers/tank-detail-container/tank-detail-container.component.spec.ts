import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankDetailContainerComponent } from './tank-detail-container.component';

describe('TankDetailContainerComponent', () => {
  let component: TankDetailContainerComponent;
  let fixture: ComponentFixture<TankDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TankDetailContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
