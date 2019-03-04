import { createSelector } from 'reselect';

export const selectConfiguredKeyMap = (state: State) => state.configuredKeyMap;

export const selectPlayerKeys = createSelector(
  selectConfiguredKeyMap,
  (configuredKeyMap: ConfiguredKeyMap): PlayerKeys => {
    return configuredKeyMap.player;
  },
);

export const selectEditorKeys = createSelector(
  selectConfiguredKeyMap,
  (configuredKeyMap: ConfiguredKeyMap): EditorKeys => {
    return configuredKeyMap.editor;
  },
);

export const selectPlayerMovementKeys = createSelector(
  selectPlayerKeys,
  (playerKeys: PlayerKeys): PlayerMovementKeys => {
    return playerKeys.movement;
  },
);

export const selectPlayerInteractionKeys = createSelector(
  selectPlayerKeys,
  (playerKeys: PlayerKeys): PlayerInteractionKeys => {
    return playerKeys.interaction;
  },
);

export const selectEditorDrawPolygonKeys = createSelector(
  selectEditorKeys,
  (editorKeys: EditorKeys): EditorDrawPolygonKeys => {
    return editorKeys.drawPolygon;
  },
);

export const selectEditorNeutralKeys = createSelector(
  selectEditorKeys,
  (editorKeys: EditorKeys): EditorNeutralKeys => {
    return editorKeys.neutral;
  },
);
