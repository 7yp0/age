import {
  curry,
  equals,
  findLast,
  flip,
  ifElse,
  isNil,
  not,
  or,
  prop,
} from 'ramda';
import { createAddErrorNotificationAction } from '../actions/notifications';
import {
  createAddTemporaryPolygonToPolygonsAction,
  createAddVertexToTemporaryPolygonAction,
  createClearTemporaryPolygonAction,
  createDeselectPolygonAction,
  createSelectPolygonAction,
} from '../actions/polygons';
import { EditorModes } from '../configs/editor';
import { NotificationTypes } from '../configs/notifications';
import {
  selectEditorDrawPolygonKeys,
  selectEditorNeutralKeys,
} from '../selectors/configuredKeyMap';
import { selectEditorMode } from '../selectors/editor';
import { selectKeyPressedMap } from '../selectors/keyPressedMap';
import { selectMouseLeftClickPosition } from '../selectors/mousePositions';
import { selectPolygons, selectTemporaryPolygon } from '../selectors/polygons';
import { extendVectorToHorizontalLine } from '../utils/vector2D';
import {
  areVerticiesValid,
  isPolygonIntersectingWithLine,
} from '../validators/polygons';

export function handleAddVertexToTemporaryPolygon(
  state: State,
  dispatch: Dispatch,
): void {
  const keyPressedMap = selectKeyPressedMap(state);
  const { addPoint } = selectEditorDrawPolygonKeys(state);
  const mouseLeftClickPosition = selectMouseLeftClickPosition(state);
  const getFromKeyPressedMap = flip(prop)(keyPressedMap) as any;

  if (
    or(
      not(equals(selectEditorMode(state), EditorModes.DrawPolygon)),
      not(getFromKeyPressedMap(addPoint)),
    )
  ) {
    return;
  }

  dispatch(createAddVertexToTemporaryPolygonAction(mouseLeftClickPosition));
}

export function handleAddTemporaryPolygonToPolygons(
  state: State,
  dispatch: Dispatch,
): void {
  const keyPressedMap = selectKeyPressedMap(state);
  const { stop } = selectEditorDrawPolygonKeys(state);
  const getFromKeyPressedMap = flip(prop)(keyPressedMap) as any;

  if (
    or(
      not(equals(selectEditorMode(state), EditorModes.DrawPolygon)),
      not(getFromKeyPressedMap(stop)),
    )
  ) {
    return;
  }

  const temporaryPolygon = selectTemporaryPolygon(state);

  ifElse(
    areVerticiesValid,
    () => {
      dispatch(createAddTemporaryPolygonToPolygonsAction(temporaryPolygon));
    },
    () => {
      dispatch(
        createAddErrorNotificationAction(
          NotificationTypes.PolygonInvalid,
          temporaryPolygon,
        ),
      );
      dispatch(createClearTemporaryPolygonAction());
    },
  )(temporaryPolygon);
}

export function handleSelectPolygon(state: State, dispatch: Dispatch): void {
  const keyPressedMap = selectKeyPressedMap(state);
  const { selectPolygon } = selectEditorNeutralKeys(state);
  const getFromKeyPressedMap = flip(prop)(keyPressedMap) as any;

  if (
    or(
      not(equals(selectEditorMode(state), EditorModes.Neutral)),
      not(getFromKeyPressedMap(selectPolygon)),
    )
  ) {
    return;
  }

  const mouseLeftClickPosition = selectMouseLeftClickPosition(state);
  const polygons = selectPolygons(state);

  const horizontalLine = extendVectorToHorizontalLine(mouseLeftClickPosition);

  const intersectingPolygon: Polygon | undefined = findLast(
    curry(isPolygonIntersectingWithLine)(horizontalLine),
  )(Object.values(polygons));

  ifElse(
    isNil,
    () => {
      dispatch(createDeselectPolygonAction());
    },
    () => {
      const { id } = intersectingPolygon as Polygon;
      dispatch(createSelectPolygonAction(id));
    },
  )(intersectingPolygon);
}
