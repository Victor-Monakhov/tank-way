import {Calculations} from './calculations.class';

describe('Calculation', () => {
  it('should create an instance', () => {
    expect(new Calculations()).toBeTruthy();
  });

  describe('getAngleBetweenCenterAndPoint', () => {
    it(
      'should return an angle between center of element and point inside the element',
      () => {
      const angle1 = Calculations.getAngleBetweenCenterAndPoint(100, 100, 75, 75);
      expect(angle1).toBe(45);
      const angle2 = Calculations.getAngleBetweenCenterAndPoint(100, 100, 25, 75);
      expect(angle2).toBe(135);
    })
  });
});
