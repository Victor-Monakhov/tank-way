import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PositionSelectionComponent} from './position-selection.component';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import {DemoService} from '../../../../demo/services/demo-service/demo.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {VmForDirective} from '../../../../../shared/directives/vm-for.directive';
import {NgScrollbarModule} from 'ngx-scrollbar';

class DemoServiceStub {

}

describe('PositionSelectionComponent', () => {
  let fixture: ComponentFixture<PositionSelectionComponent>;
  let component: PositionSelectionComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgScrollbarModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        PositionSelectionComponent,
        VmForDirective
      ],
      providers: [
        UntypedFormBuilder,
        {provide: DemoService, useClass: DemoServiceStub}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(PositionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create "PositionSelectionComponent"', () => {
    expect(component).toBeTruthy();
  });

  describe('onTeamChange', () => {
    it('should change "team" value if "flag === true"', () => {
      const teamBefore = component.team;
      component.onTeamChange(true);
      expect(teamBefore).not.toEqual(component.team);
      component.onTeamChange(true);
      expect(teamBefore).toEqual(component.team);
    });

    it('should reset "position" value to 0 if "flag === true"', () => {
      component.form.get('position').setValue(4);
      component.onTeamChange(true);
      expect(component.form.get('position').value).toBe(0);
    });
  });
});
