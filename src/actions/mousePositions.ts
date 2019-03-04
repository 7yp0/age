export enum MousePositionsActionTypes {
  MOUSE_MOVE = 'MOUSE_MOVE',
  MOUSE_CLICK_LEFT = 'MOUSE_CLICK_LEFT',
  MOUSE_CLICK_RIGHT = 'MOUSE_CLICK_RIGHT',
  MOUSE_DOWN = 'MOUSE_DOWN',
}

export const createMouseMoveAction = (position: Point): Action<Point> => ({
  type: MousePositionsActionTypes.MOUSE_MOVE,
  payload: position,
});

export const createMouseClickLeftAction = (position: Point): Action<Point> => ({
  type: MousePositionsActionTypes.MOUSE_CLICK_LEFT,
  payload: position,
});

export const createMouseDownAction = (position: Point): Action<Point> => ({
  type: MousePositionsActionTypes.MOUSE_DOWN,
  payload: position,
});

export const createMouseClickRightAction = (
  position: Point,
): Action<Point> => ({
  type: MousePositionsActionTypes.MOUSE_CLICK_RIGHT,
  payload: position,
});
