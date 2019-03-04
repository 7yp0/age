export enum KeyPressedMapActionTypes {
  KEYPRESSEDMAP_CHANGE = 'KEYPRESSEDMAP_CHANGE',
}

export const createKeyMapChangeAction = (
  keyMap: KeyPressedMap,
): KeyPressedMapChangeAction => ({
  type: KeyPressedMapActionTypes.KEYPRESSEDMAP_CHANGE,
  payload: keyMap,
});
