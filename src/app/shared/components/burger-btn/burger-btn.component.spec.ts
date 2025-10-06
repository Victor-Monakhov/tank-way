import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerBtnComponent } from './burger-btn.component';

describe('BurgerBtnComponent', () => {
  let component: BurgerBtnComponent;
  let fixture: ComponentFixture<BurgerBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurgerBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
