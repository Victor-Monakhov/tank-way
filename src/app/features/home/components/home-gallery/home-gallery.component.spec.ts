import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGalleryComponent } from './home-gallery.component';

describe('HomeGalleryComponent', () => {
  let component: HomeGalleryComponent;
  let fixture: ComponentFixture<HomeGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
