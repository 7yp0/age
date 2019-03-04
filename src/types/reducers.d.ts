type Reducer<S> = (state: S, action: Action<any>) => void;

interface ReducerObject {
  [key: string]: Reducer<any>;
}

interface State {
  camera: Camera;
  player: Player;
  keyPressedMap: KeyPressedMap;
  clickables: Clickables;
  configuredKeyMap: ConfiguredKeyMap;
  editor: Editor;
  mousePositions: MousePositions;
  polygons: PolygonsState;
  notifications: NotificationState;
  version: Uid;
  [key: string]: any;
}
