import config from '../configs';
import * as cameraHandler from './camera';
import * as clickableHandler from './clickable';
import * as editorHandler from './editor';
import * as playerHandler from './player';
import * as polygonsHandler from './polygons';
import * as stateResetHandler from './stateReset';

const handlerFunctions: HandlerObject = {
  ...(config.isProduction ? playerHandler : {}),
  ...(config.isProduction ? clickableHandler : {}),
  ...stateResetHandler,
  ...cameraHandler,
  ...(config.isDevelopment ? editorHandler : {}),
  ...(config.isDevelopment ? polygonsHandler : {}),
};

export default handlerFunctions;
