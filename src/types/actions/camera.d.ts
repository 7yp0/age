type CameraMoveAction = Action<Point>;
type CameraSetLastPositionAction = Action<Point>;
type CameraActions = CameraMoveAction | CameraSetLastPositionAction;
