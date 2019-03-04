import camera from './camera';
import clickables from './clickables';
import configuredKeyMap from './configuredKeyMap';
import editor from './editor';
import keyPressedMap from './keyPressedMap';
import mousePositions from './mousePositions';
import notifications from './notifications';
import player from './player';
import polygons from './polygons';
import version from './version';

const reducers: ReducerObject = {
  camera,
  player,
  keyPressedMap,
  configuredKeyMap,
  editor,
  mousePositions,
  polygons,
  notifications,
  clickables,
  version,
};

export default reducers;
