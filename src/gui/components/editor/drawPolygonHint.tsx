import { Typography } from '@material-ui/core';
import { equals } from 'ramda';
import * as React from 'react';
import { EditorModes } from '../../../configs/editor';
import { selectEditorMode } from '../../../selectors/editor';
import { Consumer } from '../../uiState';

const DrawPolygonHint = () => (
  <Consumer>
    {({ state, dispatch }) => {
      const editorMode = selectEditorMode(state);
      const drawPolygonMode = equals(editorMode, EditorModes.DrawPolygon);

      return (
        <React.Fragment>
          {drawPolygonMode && <Typography>Draw Polygon Mode</Typography>}
        </React.Fragment>
      );
    }}
  </Consumer>
);

export default DrawPolygonHint;
