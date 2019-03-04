import { MousePositionsActionTypes } from '../actions/mousePositions';

const defaultState: MousePositions = {
  click: {
    left: {
      x: 0,
      y: 0,
    },
    right: {
      x: 0,
      y: 0,
    },
  },
  down: {
    x: 0,
    y: 0,
  },
  movePosition: {
    x: 0,
    y: 0,
  },
};

function reducer(
  state: MousePositions = defaultState,
  action: MousePositionsActions,
): MousePositions {
  const { type, payload: position } = action;

  switch (type) {
    case MousePositionsActionTypes.MOUSE_MOVE: {
      return {
        ...state,
        movePosition: position,
      };
    }

    case MousePositionsActionTypes.MOUSE_CLICK_LEFT: {
      return {
        ...state,
        click: {
          ...state.click,
          left: position,
        },
      };
    }

    case MousePositionsActionTypes.MOUSE_CLICK_RIGHT: {
      return {
        ...state,
        click: {
          ...state.click,
          right: position,
        },
      };
    }

    case MousePositionsActionTypes.MOUSE_DOWN: {
      return {
        ...state,
        down: position,
      };
    }
  }

  return state;
}

export default reducer;
