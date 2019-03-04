import { createSelector } from 'reselect';

export const selectMousePositions = (state: State) => state.mousePositions;

export const selectMouseClickPositions = createSelector(
  selectMousePositions,
  (mousePositions: MousePositions): ClickPositions => {
    return mousePositions.click;
  },
);

export const selectMouseLeftClickPosition = createSelector(
  selectMouseClickPositions,
  (mouseClickPositions: ClickPositions): Point => {
    return mouseClickPositions.left;
  },
);

export const selectMouseRightClickPosition = createSelector(
  selectMouseClickPositions,
  (mouseClickPositions: ClickPositions): Point => {
    return mouseClickPositions.right;
  },
);

export const selectMouseMovePosition = createSelector(
  selectMousePositions,
  (mousePositions: MousePositions): Point => {
    return mousePositions.movePosition;
  },
);

export const selectMouseDownPosition = createSelector(
  selectMousePositions,
  (mousePositions: MousePositions): Point => {
    return mousePositions.down;
  },
);
