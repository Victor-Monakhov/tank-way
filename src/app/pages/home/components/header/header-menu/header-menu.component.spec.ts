import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderMenuComponent} from './header-menu.component';
import {PanelService} from '../../../../../shared/services/panel-service/panel.service';
import {PanelServiceStub} from '../../../../../shared/services/panel-service/panel-service-stub.class';

describe('HeaderMenuComponent', () => {
  let fixture: ComponentFixture<HeaderMenuComponent>
  let component: HeaderMenuComponent;
  let service: PanelService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderMenuComponent
      ],
      providers: [
        {provide: PanelService, useClass: PanelServiceStub}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderMenuComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PanelService);
    fixture.detectChanges();
  });

  it('should create a HeaderMenuComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('onClose', () => {
    it('should call "next" fn on PanelService.titleHeaderMenu$ with "false" value', () => {
      const nextSpy = spyOn(service.titleHeaderMenu$, 'next');
      component.onClose();
      expect(nextSpy).toHaveBeenCalledWith(false);
    })
  });
});
