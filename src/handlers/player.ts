import { flip, prop } from 'ramda';
import { createPlayerMoveAction } from '../actions/player';
import { Direction } from '../configs/player';
import { selectPlayerMovementKeys } from '../selectors/configuredKeyMap';
import { selectKeyPressedMap } from '../selectors/keyPressedMap';

export function handlePlayerMovement(state: State, dispatch: Dispatch): void {
  const keyPressedMap = selectKeyPressedMap(state);
  const { up, down, left, right } = selectPlayerMovementKeys(state);
  const getFromKeyPressedMap = flip(prop)(keyPressedMap) as any;

  if ([up, left].every(getFromKeyPressedMap)) {
    dispatch(createPlayerMoveAction(Direction.UpLeft));
    return;
  }

  if ([up, right].every(getFromKeyPressedMap)) {
    dispatch(createPlayerMoveAction(Direction.UpRight));
    return;
  }

  if ([down, left].every(getFromKeyPressedMap)) {
    dispatch(createPlayerMoveAction(Direction.DownLeft));
    return;
  }

  if ([down, right].every(getFromKeyPressedMap)) {
    dispatch(createPlayerMoveAction(Direction.DownRight));
    return;
  }

  if (getFromKeyPressedMap(up)) {
    dispatch(createPlayerMoveAction(Direction.Up));
    return;
  }

  if (getFromKeyPressedMap(down)) {
    dispatch(createPlayerMoveAction(Direction.Down));
    return;
  }

  if (getFromKeyPressedMap(left)) {
    dispatch(createPlayerMoveAction(Direction.Left));
    return;
  }

  if (getFromKeyPressedMap(right)) {
    dispatch(createPlayerMoveAction(Direction.Right));
    return;
  }
}
