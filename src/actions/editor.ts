import { EditorModes } from '../configs/editor';

export enum EditorActionTypes {
  EDITOR_CHANGE_MODE = 'EDITOR_CHANGE_MODE',
}

export const createEditorChangeModeAction = (
  mode: EditorModes,
): EditorChangeModeAction => ({
  type: EditorActionTypes.EDITOR_CHANGE_MODE,
  payload: mode,
});
