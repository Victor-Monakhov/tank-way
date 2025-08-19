import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDealDialogComponent } from './shop-deal-dialog.component';

describe('ShopConfirmNotificationComponent', () => {
  let component: ShopDealDialogComponent;
  let fixture: ComponentFixture<ShopDealDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopDealDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopDealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
