import { EditorModes } from '../configs/editor';

declare global {
  interface Editor {
    mode: EditorModes;
  }
}
