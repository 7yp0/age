interface Entity {
  active: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface PositionableEntity extends Entity {
  position: Point;
  size: Size;
}

interface MoveableEntity extends PositionableEntity {
  speed: number;
  targetPosition: Point;
}
