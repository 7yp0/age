import { Direction } from '../../configs/player';

declare global {
  type PlayerMoveAction = Action<Direction>;
  type PlayerSetPositionAction = Action<Point>;
  type PlayerActions = PlayerMoveAction | PlayerSetPositionAction;
}
