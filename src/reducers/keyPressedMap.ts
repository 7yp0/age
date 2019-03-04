import { KeyPressedMapActionTypes } from '../actions/keyPressedMap';

const defaultState: KeyPressedMap = {};

function updateKeyPressedMap(
  state: KeyPressedMap,
  payload: KeyPressedMap,
): KeyPressedMap {
  return {
    ...state,
    ...payload,
  };
}

function reducer(
  state: KeyPressedMap = defaultState,
  action: KeyPressedMapActions,
): KeyPressedMap {
  const { type, payload } = action;

  switch (type) {
    case KeyPressedMapActionTypes.KEYPRESSEDMAP_CHANGE: {
      return updateKeyPressedMap(state, payload);
    }
  }

  return state;
}

export default reducer;
