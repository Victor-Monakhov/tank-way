import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameShopBtnComponent } from './game-shop-btn.component';

describe('GameShopBtnComponent', () => {
  let component: GameShopBtnComponent;
  let fixture: ComponentFixture<GameShopBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameShopBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameShopBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
