import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlesTableComponent } from './battles-table.component';

describe('BattlesTableComponent', () => {
  let component: BattlesTableComponent;
  let fixture: ComponentFixture<BattlesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattlesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattlesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
