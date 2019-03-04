import { equals, flip, prop } from 'ramda';
import { createKeyMapChangeAction } from '../actions/keyPressedMap';
import { selectKeyPressedMap } from '../selectors/keyPressedMap';
import { dispatch, getState } from '../store';

const KEY_DOWN_EVENT = 'keydown';
const KEY_UP_EVENT = 'keyup';

function onKeyDownOrUp(event: KeyboardEvent): void {
  const { keyCode, type } = event;
  const isKeyDown = equals(type, KEY_DOWN_EVENT);
  const getFromStateKeyPressedMap = flip(prop)(
    selectKeyPressedMap(getState()),
  ) as any;

  // When key with value is already saved, we do not need to dispatch the action
  if (equals(getFromStateKeyPressedMap(keyCode), isKeyDown)) {
    return;
  }

  const keyPressedMap: KeyPressedMap = {
    [keyCode]: isKeyDown,
  };

  dispatch(createKeyMapChangeAction(keyPressedMap));
}

export const keyDown: EventTuple<KeyboardEvent> = [
  KEY_DOWN_EVENT,
  onKeyDownOrUp,
  true,
];
export const keyUp: EventTuple<KeyboardEvent> = [
  KEY_UP_EVENT,
  onKeyDownOrUp,
  true,
];
