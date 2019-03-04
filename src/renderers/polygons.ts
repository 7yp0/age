import {
  add,
  always,
  equals,
  forEachObjIndexed,
  head,
  ifElse,
  isEmpty,
  last,
  length,
  not,
  or,
} from 'ramda';
import { Colors } from '../configs/colors';
import { EditorModes } from '../configs/editor';
import { strokeLine } from '../drawHelpers/lines';
import { selectEditorMode } from '../selectors/editor';
import { selectMouseMovePosition } from '../selectors/mousePositions';
import {
  selectPolygons,
  selectSelectedPolygonId,
  selectTemporaryPolygon,
} from '../selectors/polygons';
import { areVerticiesValid } from '../validators/polygons';

export function drawFromLastPointToMouse(
  state: State,
  context: CanvasRenderingContext2D,
): void {
  const temporaryPolygon = selectTemporaryPolygon(state);

  if (
    or(
      not(equals(selectEditorMode(state), EditorModes.DrawPolygon)),
      isEmpty(temporaryPolygon),
    )
  ) {
    return;
  }

  const mouseMovePosition = selectMouseMovePosition(state);
  const strokeStyle = ifElse(
    areVerticiesValid,
    always(Colors.Blue),
    always(Colors.Red),
  )([...temporaryPolygon, mouseMovePosition]);
  const lastVertex = last(temporaryPolygon) as Point;

  strokeLine(lastVertex, mouseMovePosition, context, strokeStyle);
}

export function drawTemporaryPolygon(
  state: State,
  context: CanvasRenderingContext2D,
): void {
  const temporaryPolygon = selectTemporaryPolygon(state);

  if (
    or(
      not(equals(selectEditorMode(state), EditorModes.DrawPolygon)),
      isEmpty(temporaryPolygon),
    )
  ) {
    return;
  }

  const strokeStyle = ifElse(
    areVerticiesValid,
    always(Colors.Green),
    always(Colors.Red),
  )(temporaryPolygon);

  temporaryPolygon.forEach((vertex: Point, index: number) => {
    const nextIndex = add(index, 1);

    if (equals(length(temporaryPolygon), nextIndex)) {
      return;
    }

    const nextVertex = temporaryPolygon[nextIndex];

    strokeLine(vertex, nextVertex, context, strokeStyle);
  });
}

export function drawolygon(
  state: State,
  context: CanvasRenderingContext2D,
): void {
  const polygons = selectPolygons(state);
  const selectedPolygonId = selectSelectedPolygonId(state);

  if (isEmpty(polygons)) {
    return;
  }

  forEachObjIndexed(({ verticies, id }: Polygon) => {
    const firstVerticy = head(verticies) as Point;

    verticies.forEach((vertex: Point, index: number) => {
      const nextIndex = add(index, 1);

      const strokeStyle = ifElse(
        equals(selectedPolygonId),
        always(Colors.Blue),
        always(Colors.Black),
      )(id);

      if (equals(length(verticies), nextIndex)) {
        strokeLine(vertex, firstVerticy, context, strokeStyle);
        return;
      }

      const nextVertex = verticies[nextIndex];
      strokeLine(vertex, nextVertex, context, strokeStyle);
    });
  }, polygons);
}
