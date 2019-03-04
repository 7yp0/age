import { complement, includes, isEmpty, not } from 'ramda';
import { v1 as uuid } from 'uuid';

import { PlayerActionTypes } from '../actions/player';
import { getEditorState } from '../sideffects/editorState';

const loadedState = getEditorState();

const defaultState: Uid = not(isEmpty(loadedState))
  ? loadedState.version
  : uuid();

const blackList = [PlayerActionTypes.PLAYER_MOVE];

function reducer(state: Uid = defaultState, action: Action<any>): Uid {
  const { type } = action;

  if (complement(includes)(type, blackList)) {
    return uuid();
  }

  return state;
}

export default reducer;
