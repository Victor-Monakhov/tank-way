import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityMenuComponent } from './quantity-menu.component';

describe('QuantityMenuComponent', () => {
  let component: QuantityMenuComponent;
  let fixture: ComponentFixture<QuantityMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
