import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopConfirmNotificationComponent } from './shop-confirm-notification.component';

describe('ShopConfirmNotificationComponent', () => {
  let component: ShopConfirmNotificationComponent;
  let fixture: ComponentFixture<ShopConfirmNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopConfirmNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopConfirmNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
