import { isEmpty, not } from 'ramda';
import { EditorActionTypes } from '../actions/editor';
import { EditorModes } from '../configs/editor';
import { getEditorState } from '../sideffects/editorState';

const loadedState = getEditorState();

const defaultState: Editor = not(isEmpty(loadedState))
  ? loadedState.editor
  : {
      mode: EditorModes.Neutral,
    };

function updateEditorMode(state: Editor, mode: EditorModes): Editor {
  return {
    ...state,
    mode,
  };
}

function reducer(state: Editor = defaultState, action: EditorActions): Editor {
  const { type, payload } = action;

  switch (type) {
    case EditorActionTypes.EDITOR_CHANGE_MODE: {
      return updateEditorMode(state, payload);
    }
  }

  return state;
}

export default reducer;
