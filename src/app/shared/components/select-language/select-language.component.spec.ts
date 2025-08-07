import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLanguageComponent } from './select-language.component';

describe('SelectLanguageComponent', () => {
  let component: SelectLanguageComponent;
  let fixture: ComponentFixture<SelectLanguageComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [SelectLanguageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
