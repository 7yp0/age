import Button from '@material-ui/core/Button';
import * as React from 'react';
import { saveEditorState } from '../../../sideffects/editorState';

const SaveEditorState = () => (
  <div>
    <Button color="primary" variant="contained" onClick={saveEditorState}>
      Save State
    </Button>
  </div>
);

export default SaveEditorState;
