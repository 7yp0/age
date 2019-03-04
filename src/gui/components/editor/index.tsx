import * as React from 'react';
import DrawPolygonHint from './drawPolygonHint';
import PolygonMenu from './polygonMenu';
import DownloadState from './saveEditorState';

const Editor = () => (
  <div
    style={{
      pointerEvents: 'auto',
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      padding: '0.5rem',
      width: '300px',
      left: 0,
      top: 0,
    }}
  >
    <DownloadState />
    <br />
    <DrawPolygonHint />
    <PolygonMenu />
  </div>
);

export default Editor;
