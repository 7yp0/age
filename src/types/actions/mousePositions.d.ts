type MousePositionsMoveAction = Action<Point>;
type MousePositionsClickLeftAction = Action<Point>;
type MousePositionsClickRightAction = Action<Point>;
type MousePositionsActions =
  | MousePositionsMoveAction
  | MousePositionsClickLeftAction
  | MousePositionsClickRightAction;
