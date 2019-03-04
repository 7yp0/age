import render from './gui';
import handlers from './handlers/index';
import renderers from './renderers/index';
import { initializeDebuggingStore } from './sideffects/debuggingStore';
import { initializeEvents } from './sideffects/events';
import { getCanvasById } from './sideffects/window';
import { dispatch, getState } from './store';

let animationFrameId: number;
const { canvas, context } = getCanvasById('render-canvas');

function renderLoop(time: number): void {
  animationFrameId = requestAnimationFrame(renderLoop);

  context.clearRect(0, 0, canvas.width, canvas.height);

  const state = getState();

  Object.values(handlers).forEach((handler: Handler) => {
    handler(state, dispatch);
  });

  Object.values(renderers).forEach((renderer: Renderer) => {
    renderer(state, context);
  });
}

initializeEvents(canvas);
initializeDebuggingStore();
render();

animationFrameId = requestAnimationFrame(renderLoop);
