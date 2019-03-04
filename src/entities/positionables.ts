import { createEntity } from '.';

export const defaultPosition: Point = {
  x: 0,
  y: 0,
};

export const defaultSize: Size = {
  width: 16,
  height: 16,
};

export function createPositionable(
  position: Point = defaultPosition,
  size: Size = defaultSize,
  active: boolean = true,
): PositionableEntity {
  return {
    position,
    size,
    ...createEntity(active),
  };
}
