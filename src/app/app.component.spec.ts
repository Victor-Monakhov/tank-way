import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let componentFixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    componentFixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = componentFixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
