import config from '../configs';
import * as guiRenderer from './gui';
import * as playerRenderer from './player';
import * as polygonsRenderer from './polygons';

const rendererFunctions: RendererObject = {
  ...playerRenderer,
  ...guiRenderer,
  ...(config.isDevelopment ? polygonsRenderer : {}),
};

export default rendererFunctions;
