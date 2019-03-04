import { createSelector } from 'reselect';

export const selectCamera = (state: State) => state.camera;

export const selectCameraPosition = createSelector(
  selectCamera,
  (camera: Camera): Point => {
    return camera.position;
  },
);

export const selectCameraMovingDistance = createSelector(
  selectCamera,
  (camera: Camera): Point => {
    return camera.movingDistance;
  },
);

export const selectCameraSize = createSelector(
  selectCamera,
  (camera: Camera): Size => {
    return camera.size;
  },
);

export const selectLastCameraPosition = createSelector(
  selectCamera,
  (camera: Camera): Point => {
    return camera.lastPosition;
  },
);
