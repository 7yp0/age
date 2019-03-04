import {
  createPositionable,
  defaultPosition,
  defaultSize,
} from './positionables';

export function createMoveableEntity(
  speed: number = 2,
  position: Point = defaultPosition,
  size: Size = defaultSize,
  active: boolean = true,
): MoveableEntity {
  return {
    speed,
    targetPosition: defaultPosition,
    ...createPositionable(position, size, active),
  };
}
