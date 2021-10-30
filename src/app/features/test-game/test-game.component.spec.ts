import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGameComponent } from './test-game.component';

describe('TestGameComponent', () => {
  let component: TestGameComponent;
  let fixture: ComponentFixture<TestGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
