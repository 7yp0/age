import { Direction } from '../configs/player';

export enum PlayerActionTypes {
  PLAYER_MOVE = 'PLAYER_MOVE',
  PLAYER_SET_POSITION = 'PLAYER_SET_POSITION',
}

export const createPlayerMoveAction = (
  direction: Direction,
): PlayerMoveAction => ({
  type: PlayerActionTypes.PLAYER_MOVE,
  payload: direction,
});

export const createPlayerSetPositionAction = (
  position: Point,
): PlayerSetPositionAction => ({
  type: PlayerActionTypes.PLAYER_SET_POSITION,
  payload: position,
});
