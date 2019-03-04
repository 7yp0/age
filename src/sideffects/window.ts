import { isNil } from 'ramda';
import config from '../configs';

export function getCanvasById(
  id: string,
): { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D } {
  const canvasElement: HTMLCanvasElement | null = document.querySelector(
    `#${id}`,
  );

  if (isNil(canvasElement)) {
    throw new Error('Canvas not found!');
  }

  canvasElement.width = config.canvasWidth;
  canvasElement.height = config.canvasHeight;

  const canvasContext: CanvasRenderingContext2D | null = canvasElement.getContext(
    '2d',
  );

  if (isNil(canvasContext)) {
    throw new Error('Context not found!');
  }

  const canvas = canvasElement as HTMLCanvasElement;
  const context = canvasContext as CanvasRenderingContext2D;

  context.imageSmoothingEnabled = config.imageSmoothingEnabled;

  return {
    canvas,
    context,
  };
}

export function getWindowSize(): Size {
  return {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  };
}
