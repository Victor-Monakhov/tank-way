import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarRoomHeaderComponent } from './war-room-header.component';

describe('WarRoomHeaderComponent', () => {
  let component: WarRoomHeaderComponent;
  let fixture: ComponentFixture<WarRoomHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarRoomHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarRoomHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
