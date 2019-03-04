import { createVector } from '../utils/vector2D';
import {
  createPositionable,
  defaultPosition,
  defaultSize,
} from './positionables';

export function createCamera(
  position: Point = defaultPosition,
  size: Size = defaultSize,
  active: boolean = true,
): Camera {
  return {
    lastPosition: position,
    movingDistance: createVector(0, 0),
    ...createPositionable(position, size, active),
  };
}
