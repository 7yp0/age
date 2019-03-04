import { EditorModes } from '../../configs/editor';

declare global {
  type EditorChangeModeAction = Action<EditorModes>;
  type EditorActions = EditorChangeModeAction;
}
