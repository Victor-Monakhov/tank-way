import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameItemBtnComponent } from './game-item-btn.component';

describe('GameItemBtnComponent', () => {
  let component: GameItemBtnComponent;
  let fixture: ComponentFixture<GameItemBtnComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [GameItemBtnComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameItemBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
