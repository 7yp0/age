import { __, add, isEmpty, not, subtract } from 'ramda';
import { PlayerActionTypes } from '../actions/player';
import { Direction } from '../configs/player';
import { createMoveableEntity } from '../entities/moveables';
import { getEditorState } from '../sideffects/editorState';

const loadedState = getEditorState();

const defaultState: Player = not(isEmpty(loadedState))
  ? loadedState.player
  : createMoveableEntity();

function playerMove(state: Player, direction: Direction): Player {
  const { position, speed } = state;
  const { x, y } = position;

  const addSpeed = add(speed);
  const subtractSpeed = subtract(__, speed);

  switch (direction) {
    case Direction.Up: {
      return {
        ...state,
        position: {
          ...position,
          y: subtractSpeed(y),
        },
      };
    }
    case Direction.UpLeft: {
      return {
        ...state,
        position: {
          ...position,
          y: subtractSpeed(y),
          x: subtractSpeed(x),
        },
      };
    }
    case Direction.UpRight: {
      return {
        ...state,
        position: {
          ...position,
          y: subtractSpeed(y),
          x: addSpeed(x),
        },
      };
    }
    case Direction.Down: {
      return {
        ...state,
        position: {
          ...position,
          y: addSpeed(y),
        },
      };
    }
    case Direction.DownLeft: {
      return {
        ...state,
        position: {
          ...position,
          y: addSpeed(y),
          x: subtractSpeed(x),
        },
      };
    }
    case Direction.DownRight: {
      return {
        ...state,
        position: {
          ...position,
          y: addSpeed(y),
          x: addSpeed(x),
        },
      };
    }
    case Direction.Left: {
      return {
        ...state,
        position: {
          ...position,
          x: subtractSpeed(x),
        },
      };
    }
    case Direction.Right: {
      return {
        ...state,
        position: {
          ...position,
          x: addSpeed(x),
        },
      };
    }
    default: {
      return state;
    }
  }
}

function playerSetPosition(state: Player, position: Point) {
  return {
    ...state,
    position,
  };
}

function reducer(state: Player = defaultState, action: PlayerActions): Player {
  const { type, payload } = action;

  switch (type) {
    case PlayerActionTypes.PLAYER_MOVE: {
      return playerMove(state, payload as Direction);
    }

    case PlayerActionTypes.PLAYER_SET_POSITION: {
      return playerSetPosition(state, payload as Point);
    }
  }

  return state;
}

export default reducer;
