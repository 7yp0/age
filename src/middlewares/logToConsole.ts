import { includes } from 'ramda';
import { CameraActionTypes } from '../actions/camera';
import { KeyPressedMapActionTypes } from '../actions/keyPressedMap';
import { MousePositionsActionTypes } from '../actions/mousePositions';
import { PlayerActionTypes } from '../actions/player';
import { PolygonsActionTypes } from '../actions/polygons';
import { logAnything } from '../sideffects/log';

const mutedActions = [
  MousePositionsActionTypes.MOUSE_MOVE as string,
  KeyPressedMapActionTypes.KEYPRESSEDMAP_CHANGE as string,
  CameraActionTypes.CAMERA_MOVE as string,
  PlayerActionTypes.PLAYER_SET_POSITION as string,
  PolygonsActionTypes.SET_POLYGON_VERTICIES as string,
];

export default function logToConsole(action: Action<any>): Action<any> {
  const { type, payload } = action;

  if (includes(type, mutedActions)) {
    return action;
  }

  logAnything(type, payload);

  return action;
}
