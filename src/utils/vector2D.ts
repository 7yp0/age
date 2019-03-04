import { vec2 } from 'gl-matrix';
import {
  __,
  allPass,
  always,
  and,
  complement,
  cond,
  equals,
  gt,
  gte,
  length,
  lt,
  lte,
  max,
  min,
  multiply,
  or,
  pipe,
  prop,
  subtract,
} from 'ramda';
// http://glmatrix.net/docs/module-vec2.html

enum VectorOrientation {
  Colinear,
  Clockwise,
  Counterclockwise,
}

function convertVec2(vector: vec2): Vector {
  const [x, y] = Array.from(vector);

  return { x, y };
}

export function createVector(x: number, y: number): Vector {
  const vector = vec2.fromValues(x, y);

  return convertVec2(vector);
}

export function addVectors(vectorA: Vector, vectorB: Vector): Vector {
  return convertVec2(
    vec2.add(
      vec2.create(),
      vec2.fromValues(vectorA.x, vectorA.y),
      vec2.fromValues(vectorB.x, vectorB.y),
    ),
  );
}

export function subtractVectors(vectorA: Vector, vectorB: Vector): Vector {
  return convertVec2(
    vec2.subtract(
      vec2.create(),
      vec2.fromValues(vectorA.x, vectorA.y),
      vec2.fromValues(vectorB.x, vectorB.y),
    ),
  );
}

export function divideVectors(vectorA: Vector, vectorB: Vector): Vector {
  return convertVec2(
    vec2.divide(
      vec2.create(),
      vec2.fromValues(vectorA.x, vectorA.y),
      vec2.fromValues(vectorB.x, vectorB.y),
    ),
  );
}

export function multiplyVectors(vectorA: Vector, vectorB: Vector): Vector {
  return convertVec2(
    vec2.multiply(
      vec2.create(),
      vec2.fromValues(vectorA.x, vectorA.y),
      vec2.fromValues(vectorB.x, vectorB.y),
    ),
  );
}

export function vectorLength(vector: Vector): number {
  return vec2.length(vec2.fromValues(vector.x, vector.y));
}

export function dotVectors(vectorA: Vector, vectorB: Vector): number {
  return vec2.dot(
    vec2.fromValues(vectorA.x, vectorA.y),
    vec2.fromValues(vectorB.x, vectorB.y),
  );
}

// 2D vector cross product analog.
// The cross product of 2D vectors results in a 3D vector with only a z component.
// This function returns the magnitude of the z value.
export function crossVectors(vectorA: Vector, vectorB: Vector): number {
  const value = subtract(
    multiply(vectorA.x, vectorB.y),
    multiply(vectorA.y, vectorB.x),
  );

  // Number.POSITIVE_INFINITY - Number.POSITIVE_INFINITY = NaN, but it should be 0 (for our cases)
  if (isNaN(value)) {
    return 0;
  }

  return value;
}

// tslint:disable-next-line:max-line-length
// source: https://stackoverflow.com/questions/471962/how-do-i-efficiently-determine-if-a-polygon-is-convex-non-convex-or-complex
export function calculateZCrossProduct(
  vector1: Vector,
  vector2: Vector,
  vector3: Vector,
): number {
  return crossVectors(
    subtractVectors(vector2, vector1),
    subtractVectors(vector3, vector2),
  );
}

export function extendVectorToHorizontalLine(vector: Vector): Verticies {
  const vector2 = {
    ...vector,
    x: Number.POSITIVE_INFINITY,
  };
  return [vector, vector2];
}

export function orientation(
  point: Point,
  linePointA: Point,
  linePointB: Point,
): VectorOrientation {
  return cond([
    [equals(0), always(VectorOrientation.Colinear)],
    [gt(0), always(VectorOrientation.Clockwise)],
    [lt(0), always(VectorOrientation.Counterclockwise)],
  ])(calculateZCrossProduct(linePointA, point, linePointB));
}

export function isPointOnSegment(
  point: Point,
  linePointA: Point,
  linePointB: Point,
): boolean {
  return allPass([
    pipe(
      prop('x'),
      lte(__, max(linePointA.x, linePointB.x)),
    ),
    pipe(
      prop('x'),
      gte(__, min(linePointA.x, linePointB.x)),
    ),
    pipe(
      prop('y'),
      lte(__, max(linePointA.y, linePointB.y)),
    ),
    pipe(
      prop('y'),
      gte(__, min(linePointA.y, linePointB.y)),
    ),
  ])(point);
}

export function doLinesIntersect(lineA: Point[], lineB: Point[]): boolean {
  const lowerThan2 = lt(__, 2);

  if (or(lowerThan2(length(lineA)), lowerThan2(length(lineB)))) {
    return false;
  }

  const [pointA1, pointA2] = lineA;
  const [pointB1, pointB2] = lineB;

  const notEquals = complement(equals);

  // Find the four orientations needed for general and
  // special cases
  const orientation1 = orientation(pointB1, pointA1, pointA2);
  const orientation2 = orientation(pointB2, pointA1, pointA2);
  const orientation3 = orientation(pointA1, pointB1, pointB2);
  const orientation4 = orientation(pointA2, pointB1, pointB2);

  // General case
  if (
    and(
      notEquals(orientation1, orientation2),
      notEquals(orientation3, orientation4),
    )
  ) {
    return true;
  }

  const equals0 = equals(0);

  // Special Cases
  // pointA1, pointA2 and pointB1 are colinear and pointB1 lies on segment pointA1pointA2
  if (and(equals0(orientation1), isPointOnSegment(pointB1, pointA1, pointA2))) {
    return true;
  }

  // pointA1, pointA2 and pointB1 are colinear and pointB2 lies on segment pointA1pointA2
  if (and(equals0(orientation2), isPointOnSegment(pointB2, pointA1, pointA2))) {
    return true;
  }

  // pointB1, pointB2 and pointA1 are colinear and pointA1 lies on segment pointB1pointB2
  if (and(equals0(orientation3), isPointOnSegment(pointA1, pointB1, pointB2))) {
    return true;
  }

  // pointB1, pointB2 and pointA2 are colinear and pointA2 lies on segment pointB1pointB2
  if (and(equals0(orientation4), isPointOnSegment(pointA2, pointB1, pointB2))) {
    return true;
  }

  // Doesn't fall in any of the above cases
  return false;
}

export function isLineOnLine(lineA: Point[], lineB: Point[]): boolean {
  const [pointA1, pointA2] = lineA;
  const [pointB1] = lineB;

  // If the point 'pointB1' is colinear with line segment 'lineA',
  // then check if it lies on segment. If it lies, return true, otherwise false
  return and(
    equals(orientation(pointB1, pointA1, pointA2), VectorOrientation.Colinear),
    isPointOnSegment(pointB1, pointA1, pointA2),
  );
}
