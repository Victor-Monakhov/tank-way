import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TankSelectionComponent} from './tank-selection.component';
import {Calculations} from '../../../../../shared/classes/calculations/calculations.class';

describe('TankSelectionComponent', () => {
  let fixture: ComponentFixture<TankSelectionComponent>;
  let component: TankSelectionComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TankSelectionComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TankSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create "TankSelectionComponent"', () => {
    expect(component).toBeTruthy();
  });

  describe('onBody', () => {
    it('should set value from "tankBodies" array to "selectedTankBody"', () => {
      component.onBody(0);
      expect(component.selectedTankBody).toEqual(component.tankBodies[0]);
    });
  })

  describe('onHead', () => {
    it('should set value from "tankHeads" array to "selectedTankHead"', () => {
      component.onHead(0);
      expect(component.selectedTankHead).toEqual(component.tankHeads[0]);
    });
  });

  describe('onTarget', () => {
    it('should execute "Calculations.getAngleBetweenCenterAndPoint" fn', () => {
      const event = new MouseEvent('mousemove');
      const calcAngleSpy = spyOn(Calculations, 'getAngleBetweenCenterAndPoint');
      component.onTarget(event);
      expect(calcAngleSpy).toHaveBeenCalledWith(
        component.viewWidth,
        component.viewHeight,
        event.offsetX,
        event.offsetY
      );
    });
  })
});
