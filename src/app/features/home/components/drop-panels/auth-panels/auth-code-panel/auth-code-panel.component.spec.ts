import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCodePanelComponent } from './auth-code-panel.component';

describe('AuthCodePanelComponent', () => {
  let component: AuthCodePanelComponent;
  let fixture: ComponentFixture<AuthCodePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthCodePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthCodePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
