class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
  }
}

interface Point3d extends Point {
  z: number;
}
// An interface can extend a class!
let point3d: Point3d = {x: 1, y: 2, z: 3};
// A class in Typescript is also a type,
// For the Point class above, it also serves like a type:
type PointType = {
  x: number,
  y: number
}
// That's why class in Typescript can be extended by an interface.
// Note that when consider class as a type, its constructor and static 
// properties/methods are excluded.