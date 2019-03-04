import { divide } from 'ramda';
import config from '../configs';
import { getWindowSize } from '../sideffects/window';
import { createVector, multiplyVectors } from './vector2D';

export function scalePointToWindowSize(point: Point): Point {
  const canvasSize = {
    width: config.canvasWidth,
    height: config.canvasHeight,
  };
  const windowSize = getWindowSize();

  const widthFactor = divide(canvasSize.width, windowSize.width);
  const heightFactor = divide(canvasSize.height, windowSize.height);

  const factorVector = createVector(widthFactor, heightFactor);

  return multiplyVectors(point, factorVector);
}
