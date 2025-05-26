export class Calculations {
  public static getAngleBetweenCenterAndPoint(
    areaWidth: number,
    areaHeight: number,
    pointX: number,
    pointY: number): number {
    const tgA = (pointY - areaHeight / 2) / (pointX - areaWidth / 2);
    if (areaWidth / 2 < pointX) {
      return Math.atan(tgA) * 180 / Math.PI;
    } else {
      return Math.atan(tgA) * 180 / Math.PI + 180;
    }
  }
  public static degreeToRadian(degree: number): number {
    return degree * Math.PI / 180;
  }
  public static radianToDegree(radian: number): number {
    return radian * 180 / Math.PI;
  }
}
