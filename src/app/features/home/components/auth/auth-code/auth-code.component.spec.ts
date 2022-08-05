import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCodeComponent } from './auth-code.component';

describe('AuthCodeComponent', () => {
  let component: AuthCodeComponent;
  let fixture: ComponentFixture<AuthCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
