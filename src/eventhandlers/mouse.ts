import { flip, prop } from 'ramda';
import { createKeyMapChangeAction } from '../actions/keyPressedMap';
import {
  createMouseClickLeftAction,
  createMouseClickRightAction,
  createMouseDownAction,
  createMouseMoveAction,
} from '../actions/mousePositions';
import { KeyCodeMap } from '../configs/KeyCodeMap';
import { selectKeyPressedMap } from '../selectors/keyPressedMap';
import { dispatch, getState } from '../store';
import { scalePointToWindowSize } from '../utils/window';

const MOUSE_CLICK_LEFT_EVENT = 'click';
const MOUSE_CLICK_RIGHT_EVENT = 'contextmenu';
const MOUSE_DOWN_EVENT = 'mousedown';
const MOUSE_UP_EVENT = 'mouseup';
const MOUSE_MOVE_EVENT = 'mousemove';

function onLeftMouseClick(event: MouseEvent): void {
  const { mouseClickLeft: mouseClickLeftKeyCode } = KeyCodeMap;
  const { clientX, clientY } = event;
  const getFromStateKeyPressedMap = flip(prop)(
    selectKeyPressedMap(getState()),
  ) as any;

  event.preventDefault();

  // When key with value is already saved, we do not need to dispatch the action
  if (getFromStateKeyPressedMap(mouseClickLeftKeyCode)) {
    return;
  }

  const keyPressedMap: KeyPressedMap = {
    [mouseClickLeftKeyCode]: true,
  };

  const position: Point = scalePointToWindowSize({
    x: clientX,
    y: clientY,
  });

  dispatch(createKeyMapChangeAction(keyPressedMap));
  dispatch(createMouseClickLeftAction(position));
}

function onRightMouseClick(event: MouseEvent): void {
  const { mouseClickRight: mouseClickRightKeyCode } = KeyCodeMap;
  const { clientX, clientY } = event;
  const getFromStateKeyPressedMap = flip(prop)(
    selectKeyPressedMap(getState()),
  ) as any;

  event.preventDefault();

  // When key with value is already saved, we do not need to dispatch the action
  if (getFromStateKeyPressedMap(mouseClickRightKeyCode)) {
    return;
  }

  const keyPressedMap: KeyPressedMap = {
    [mouseClickRightKeyCode]: true,
  };

  const position: Point = scalePointToWindowSize({
    x: clientX,
    y: clientY,
  });

  dispatch(createKeyMapChangeAction(keyPressedMap));
  dispatch(createMouseClickRightAction(position));
}

function onMouseDown(event: MouseEvent): void {
  const {
    mouseDownLeft: mouseDownLeftKeyCode,
    mouseUpLeft: mouseUpLeftKeyCode,
  } = KeyCodeMap;
  const { clientX, clientY } = event;

  event.preventDefault();

  const keyPressedMap: KeyPressedMap = {
    [mouseDownLeftKeyCode]: true,
    [mouseUpLeftKeyCode]: false,
  };

  const position: Point = scalePointToWindowSize({
    x: clientX,
    y: clientY,
  });

  dispatch(createKeyMapChangeAction(keyPressedMap));
  dispatch(createMouseDownAction(position));
}

function onMouseUp(event: MouseEvent): void {
  const {
    mouseDownLeft: mouseDownLeftKeyCode,
    mouseUpLeft: mouseUpLeftKeyCode,
  } = KeyCodeMap;

  event.preventDefault();

  const keyPressedMap: KeyPressedMap = {
    [mouseDownLeftKeyCode]: false,
    [mouseUpLeftKeyCode]: true,
  };

  dispatch(createKeyMapChangeAction(keyPressedMap));
}

function onMouseMove(event: MouseEvent): void {
  const { clientX, clientY } = event;

  const position: Point = scalePointToWindowSize({
    x: clientX,
    y: clientY,
  });

  dispatch(createMouseMoveAction(position));
}

export const mouseClickLeft: EventTuple<MouseEvent> = [
  MOUSE_CLICK_LEFT_EVENT,
  onLeftMouseClick,
  false,
];
export const mouseClickRight: EventTuple<MouseEvent> = [
  MOUSE_CLICK_RIGHT_EVENT,
  onRightMouseClick,
  false,
];
export const mouseDown: EventTuple<MouseEvent> = [
  MOUSE_DOWN_EVENT,
  onMouseDown,
  false,
];
export const mouseUp: EventTuple<MouseEvent> = [
  MOUSE_UP_EVENT,
  onMouseUp,
  false,
];
export const mouseMove: EventTuple<MouseEvent> = [
  MOUSE_MOVE_EVENT,
  onMouseMove,
  false,
];
