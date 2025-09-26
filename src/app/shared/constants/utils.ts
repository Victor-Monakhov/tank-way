export function copy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function swap<T>(array: T[], index1: number, index2: number): T[] {
  const arrayCopy = copy(array);
  const temp = arrayCopy[index1];
  arrayCopy[index1] = arrayCopy[index2];
  arrayCopy[index2] = temp;
  return arrayCopy;
}

export function angleBetweenCenterAndPoint(
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
export function degreeToRadian(degree: number): number {
  return degree * Math.PI / 180;
}
export function radianToDegree(radian: number): number {
  return radian * 180 / Math.PI;
}
