import {HeaderComponent} from './header.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LocalizationService} from '../../../../shared/services/internationalization/localization.service';
import {PanelService} from '../../../../shared/services/panel-service/panel.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Subject} from 'rxjs';
import {By} from '@angular/platform-browser';
import {PanelServiceStub} from '../../../../shared/services/panel-service/panel-service-stub.class';

describe('Header Component', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  const localizationService: LocalizationService = {} as LocalizationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      providers: [
        {provide: LocalizationService, useValue: localizationService},
        {provide: PanelService, useClass: PanelServiceStub}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a header component', () => {
    expect(component).toBeTruthy();
  });

  describe('onMenu', () => {
    it('should execute the "onMove" function after clicking the menu button', () => {
      const onMoveSpy = spyOn(component, 'onMenu');
      const dropMenuEl: HTMLElement = fixture.debugElement.query(By.css('i.drop-menu')).nativeElement;
      dropMenuEl.click();
      expect(onMoveSpy).toHaveBeenCalled();
    });

    it('should call "next" fn of "headerMenuTrigger$" with "true" value', () => {
      const nextSpy = spyOn(component.headerMenuTrigger$, 'next');
      component.onMenu();
      expect(nextSpy).toHaveBeenCalledWith(true);
    });
  });

  describe('triggerHandler', () => {
    it('should call "next" fn on trigger subject', () => {
      const result = true;
      const trigger = new Subject<boolean>();
      const triggerSpy = spyOn(trigger, 'next');
      component.triggerHandler(result, trigger);
      expect(triggerSpy).toHaveBeenCalledWith(result);
    });
  });
});
