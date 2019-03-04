export enum CameraActionTypes {
  CAMERA_MOVE = 'CAMERA_MOVE',
  CAMERA_SET_LAST_POSITION = 'CAMERA_SET_LAST_POSITION',
}

export const createCameraMoveAction = (position: Point): CameraMoveAction => ({
  type: CameraActionTypes.CAMERA_MOVE,
  payload: position,
});

export const createCameraSetLastPositionAction = (
  position: Point,
): CameraMoveAction => ({
  type: CameraActionTypes.CAMERA_SET_LAST_POSITION,
  payload: position,
});
