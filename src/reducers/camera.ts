import { isEmpty, not } from 'ramda';
import { CameraActionTypes } from '../actions/camera';
import config from '../configs';
import { createCamera } from '../entities/camera';
import { getEditorState } from '../sideffects/editorState';
import { addVectors } from '../utils/vector2D';

const loadedState = getEditorState();

const defaultState: Camera = not(isEmpty(loadedState))
  ? loadedState.camera
  : createCamera(
      { x: 0, y: 0 },
      { width: config.canvasWidth, height: config.canvasHeight },
    );

function moveCameraPosition(state: Camera, movingDistance: Point): Camera {
  return {
    ...state,
    movingDistance,
    position: addVectors(state.position, movingDistance),
  };
}

function setLastCameraPosition(state: Camera, position: Point): Camera {
  return {
    ...state,
    lastPosition: position,
  };
}

function reducer(state: Camera = defaultState, action: CameraActions): Camera {
  const { type, payload } = action;

  switch (type) {
    case CameraActionTypes.CAMERA_MOVE: {
      return moveCameraPosition(state, payload as Point);
    }

    case CameraActionTypes.CAMERA_SET_LAST_POSITION: {
      return setLastCameraPosition(state, payload as Point);
    }
  }

  return state;
}

export default reducer;
