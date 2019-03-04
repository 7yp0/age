import { equals, flip, not, or, prop } from 'ramda';
import {
  createCameraMoveAction,
  createCameraSetLastPositionAction,
} from '../actions/camera';
import { createEditorChangeModeAction } from '../actions/editor';
import { EditorModes } from '../configs/editor';
import {
  selectCameraPosition,
  selectLastCameraPosition,
} from '../selectors/camera';
import {
  selectEditorDrawPolygonKeys,
  selectEditorNeutralKeys,
} from '../selectors/configuredKeyMap';
import { selectEditorMode } from '../selectors/editor';
import { selectKeyPressedMap } from '../selectors/keyPressedMap';
import {
  selectMouseDownPosition,
  selectMouseMovePosition,
} from '../selectors/mousePositions';
import { addVectors, createVector, subtractVectors } from '../utils/vector2D';

export function handleEditorDrawPolygonMode(
  state: State,
  dispatch: Dispatch,
): void {
  const keyPressedMap = selectKeyPressedMap(state);
  const { start } = selectEditorDrawPolygonKeys(state);
  const editorMode = selectEditorMode(state);
  const getFromKeyPressedMap = flip(prop)(keyPressedMap) as any;

  if (
    or(
      equals(editorMode, EditorModes.DrawPolygon),
      not(getFromKeyPressedMap(start)),
    )
  ) {
    return;
  }

  dispatch(createEditorChangeModeAction(EditorModes.DrawPolygon));
}

export function handleEditorNeutralMode(
  state: State,
  dispatch: Dispatch,
): void {
  const keyPressedMap = selectKeyPressedMap(state);
  const { stop } = selectEditorDrawPolygonKeys(state);
  const editorMode = selectEditorMode(state);
  const getFromKeyPressedMap = flip(prop)(keyPressedMap) as any;

  if (
    or(equals(editorMode, EditorModes.Neutral), not(getFromKeyPressedMap(stop)))
  ) {
    return;
  }

  dispatch(createEditorChangeModeAction(EditorModes.Neutral));
}

export function handleEditorDragStart(state: State, dispatch: Dispatch): void {
  const keyPressedMap = selectKeyPressedMap(state);
  const { dragStart } = selectEditorNeutralKeys(state);
  const getFromKeyPressedMap = flip(prop)(keyPressedMap) as any;

  const mouseDownPosition = selectMouseDownPosition(state);
  const mouseMovePosition = selectMouseMovePosition(state);
  const cameraPosition = selectCameraPosition(state);
  const lastCameraPosition = selectLastCameraPosition(state);

  if (
    or(
      not(equals(selectEditorMode(state), EditorModes.Neutral)),
      not(getFromKeyPressedMap(dragStart)),
    )
  ) {
    if (equals(cameraPosition, lastCameraPosition)) {
      return;
    }

    dispatch(createCameraMoveAction(createVector(0, 0)));
    return;
  }

  dispatch(
    createCameraMoveAction(
      addVectors(
        subtractVectors(mouseDownPosition, cameraPosition),
        subtractVectors(lastCameraPosition, mouseMovePosition),
      ),
    ),
  );
}

export function handleEditorDragStop(state: State, dispatch: Dispatch): void {
  const keyPressedMap = selectKeyPressedMap(state);
  const { dragStop } = selectEditorNeutralKeys(state);
  const getFromKeyPressedMap = flip(prop)(keyPressedMap) as any;
  const cameraPosition = selectCameraPosition(state);
  const lastCameraPosition = selectLastCameraPosition(state);

  if (
    or(
      equals(cameraPosition, lastCameraPosition),
      not(getFromKeyPressedMap(dragStop)),
    )
  ) {
    return;
  }

  dispatch(createCameraSetLastPositionAction(cameraPosition));
}
