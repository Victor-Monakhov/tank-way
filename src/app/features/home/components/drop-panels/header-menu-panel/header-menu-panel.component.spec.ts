import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuPanelComponent } from './header-menu-panel.component';

describe('HeaderMenuPanelComponent', () => {
  let component: HeaderMenuPanelComponent;
  let fixture: ComponentFixture<HeaderMenuPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderMenuPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMenuPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
