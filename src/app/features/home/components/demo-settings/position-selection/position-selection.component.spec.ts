import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PositionSelectionComponent} from './position-selection.component';
import {UntypedFormBuilder} from '@angular/forms';
import {DemoService} from '../../../../demo/services/demo-service/demo.service';

class DemoServiceStub {

}

describe('PositionSelectionComponent', () => {
  let fixture: ComponentFixture<PositionSelectionComponent>;
  let component: PositionSelectionComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PositionSelectionComponent
      ],
      providers: [
        UntypedFormBuilder,
        {provide: DemoService, useClass: DemoServiceStub}
      ]
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
