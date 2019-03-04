import { createSelector } from 'reselect';
import { EditorModes } from '../configs/editor';

export const selectEditor = (state: State) => state.editor;

export const selectEditorMode = createSelector(
  selectEditor,
  (editor: Editor): EditorModes => {
    return editor.mode;
  },
);
