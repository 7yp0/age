import { ConfiguredKeyMapActionTypes } from '../actions/configuredKeyMap';
import { KeyCodeMap } from '../configs/KeyCodeMap';

const defaultState: ConfiguredKeyMap = {
  player: {
    movement: {
      up: KeyCodeMap.w,
      down: KeyCodeMap.s,
      left: KeyCodeMap.a,
      right: KeyCodeMap.d,
    },
    interaction: {
      primary: KeyCodeMap.mouseClickLeft,
    },
  },
  editor: {
    neutral: {
      selectPolygon: KeyCodeMap.mouseClickLeft,
      dragStart: KeyCodeMap.mouseDownLeft,
      dragStop: KeyCodeMap.mouseUpLeft,
    },
    drawPolygon: {
      start: KeyCodeMap.space,
      addPoint: KeyCodeMap.mouseClickLeft,
      stop: KeyCodeMap.mouseClickRight,
    },
  },
};

function updateConfiguredKeyMap(
  state: ConfiguredKeyMap,
  newConfiguredKeyMap: ConfiguredKeyMap,
): ConfiguredKeyMap {
  return {
    ...state,
    ...newConfiguredKeyMap,
  };
}

function reducer(
  state: ConfiguredKeyMap = defaultState,
  action: ConfiguredKeyMapActions,
): ConfiguredKeyMap {
  const { type, payload } = action;

  switch (type) {
    case ConfiguredKeyMapActionTypes.CONFIGUREDKEYMAP_CHANGE: {
      const keymap = payload as ConfiguredKeyMap;
      return updateConfiguredKeyMap(state, keymap);
    }

    case ConfiguredKeyMapActionTypes.CONFIGUREDKEYMAP_RESET: {
      return defaultState;
    }
  }

  return state;
}

export default reducer;
