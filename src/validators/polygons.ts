import {
  __,
  add,
  all,
  allPass,
  aperture,
  append,
  curry,
  equals,
  filter,
  gt,
  head,
  length,
  lte,
  modulo,
  or,
} from 'ramda';
import {
  calculateZCrossProduct,
  doLinesIntersect,
  isLineOnLine,
} from '../utils/vector2D';
import { createHasMinLength } from './array';

const MIN_NUMBER_VERTICIES_FOR_POLYGON = 3;
const add1 = add(1);
const add2 = add(2);

function haveAllZProductsSameSign(
  verticies: Point[],
  index: number,
  previousSign: number | null = null,
): boolean {
  const lengthVerticies = length(verticies);

  if (
    or(
      lte(lengthVerticies, MIN_NUMBER_VERTICIES_FOR_POLYGON),
      equals(lengthVerticies, add2(index)),
    )
  ) {
    return true;
  }

  const vertex = verticies[index];
  const vertex1 = verticies[add1(index)];
  const vertex2 = verticies[add2(index)];
  const sign = Math.sign(calculateZCrossProduct(vertex, vertex1, vertex2));

  if (equals(previousSign, null)) {
    return haveAllZProductsSameSign(verticies, add1(index), sign);
  }

  const [firstVertex, secondVertex] = verticies;

  const specialCaseSign1 = Math.sign(
    calculateZCrossProduct(firstVertex, vertex1, vertex2),
  );
  const specialCaseSign2 = Math.sign(
    calculateZCrossProduct(vertex1, firstVertex, secondVertex),
  );
  const specialCaseSign3 = Math.sign(
    calculateZCrossProduct(vertex2, firstVertex, secondVertex),
  );

  if (
    all(equals(previousSign))([
      sign,
      specialCaseSign1,
      specialCaseSign2,
      specialCaseSign3,
    ])
  ) {
    return haveAllZProductsSameSign(verticies, add1(index), sign);
  }

  return false;
}

function areVerticiesConvex(verticies: Verticies) {
  return haveAllZProductsSameSign(verticies, 0);
}

export function isPolygonConvex({ verticies }: Polygon): boolean {
  return areVerticiesConvex(verticies);
}

export function areVerticiesValid(verticies: Verticies): boolean {
  return allPass([
    createHasMinLength(MIN_NUMBER_VERTICIES_FOR_POLYGON),
    areVerticiesConvex,
  ])(verticies);
}

export function isPolygonIntersectingWithLine(
  line: Verticies,
  polygon: Polygon,
): boolean {
  const polygonLines = aperture(
    2,
    append(head(polygon.verticies), polygon.verticies),
  ) as Verticies[];

  const filteredLines = filter(curry(doLinesIntersect)(line), polygonLines);

  // when any of the intersecting lines are on a segment, we are in/on the polygon
  const linesOnPolygonLines = filter(curry(isLineOnLine)(line), filteredLines);

  if (gt(length(linesOnPolygonLines), 0)) {
    return true;
  }

  const count = length(filteredLines);
  const isOdd = modulo(__, 2);

  return Boolean(isOdd(count));
}
