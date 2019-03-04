import { flip, not, prop } from 'ramda';
import { createKeyMapChangeAction } from '../actions/keyPressedMap';
import { KeyCodeMap } from '../configs/KeyCodeMap';
import { selectKeyPressedMap } from '../selectors/keyPressedMap';

export function handleMouseClickLeftReset(
  state: State,
  dispatch: Dispatch,
): void {
  const { mouseClickLeft: mouseClickLeftKeyCode } = KeyCodeMap;
  const getFromStateKeyPressedMap = flip(prop)(
    selectKeyPressedMap(state),
  ) as any;

  if (not(getFromStateKeyPressedMap(mouseClickLeftKeyCode))) {
    return;
  }

  const keyPressedMap: KeyPressedMap = {
    [mouseClickLeftKeyCode]: false,
  };

  dispatch(createKeyMapChangeAction(keyPressedMap));
}

export function handleMouseClickRightReset(
  state: State,
  dispatch: Dispatch,
): void {
  const { mouseClickRight: mouseClickRightKeyCode } = KeyCodeMap;
  const getFromStateKeyPressedMap = flip(prop)(
    selectKeyPressedMap(state),
  ) as any;

  if (not(getFromStateKeyPressedMap(mouseClickRightKeyCode))) {
    return;
  }

  const keyPressedMap: KeyPressedMap = {
    [mouseClickRightKeyCode]: false,
  };

  dispatch(createKeyMapChangeAction(keyPressedMap));
}
