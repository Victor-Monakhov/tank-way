export class Calculations {
  public static getAngleBetweenCenterAndPoint(areaWidth, areaHeight, pointX, pointY): number {
    const tgA = (pointY - areaHeight / 2) / (pointX - areaWidth / 2);
    if (areaWidth / 2 < pointX) {
      return Math.atan(tgA) * 180 / Math.PI;
    } else {
      return Math.atan(tgA) * 180 / Math.PI + 180;
    }
  }
}
