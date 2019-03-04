export enum ConfiguredKeyMapActionTypes {
  CONFIGUREDKEYMAP_CHANGE = 'CONFIGUREDKEYMAP_CHANGE',
  CONFIGUREDKEYMAP_RESET = 'CONFIGUREDKEYMAP_RESET',
}

export const createConfiguredKeyMapChangeAction = (
  keyMap: ConfiguredKeyMap,
): ConfiguredKeyMapChangeAction => ({
  type: ConfiguredKeyMapActionTypes.CONFIGUREDKEYMAP_CHANGE,
  payload: keyMap,
});

export const createConfiguredKeyMapResetAction = (): ConfiguredKeyMapResetAction => ({
  type: ConfiguredKeyMapActionTypes.CONFIGUREDKEYMAP_RESET,
  payload: undefined,
});
