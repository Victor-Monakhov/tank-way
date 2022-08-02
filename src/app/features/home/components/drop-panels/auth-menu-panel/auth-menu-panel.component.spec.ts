import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMenuPanelComponent } from './auth-menu-panel.component';

describe('AuthMenuPanelComponent', () => {
  let component: AuthMenuPanelComponent;
  let fixture: ComponentFixture<AuthMenuPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthMenuPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthMenuPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
