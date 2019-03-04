interface PlayerMovementKeys {
  up: number;
  down: number;
  left: number;
  right: number;
}

interface PlayerInteractionKeys {
  primary: number;
}

interface PlayerKeys {
  movement: PlayerMovementKeys;
  interaction: PlayerInteractionKeys;
}

interface EditorDrawPolygonKeys {
  start: number;
  addPoint: number;
  stop: number;
}

interface EditorNeutralKeys {
  selectPolygon: number;
  dragStart: number;
  dragStop: number;
}

interface EditorKeys {
  neutral: EditorNeutralKeys;
  drawPolygon: EditorDrawPolygonKeys;
}

interface ConfiguredKeyMap {
  player: PlayerKeys;
  editor: EditorKeys;
}
