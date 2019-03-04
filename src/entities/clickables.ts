import { createEntity } from '.';

export function createClickable(
  polygonId: Uid,
  active: boolean = true,
): Clickable {
  return {
    polygonId,
    script: {
      moduleName: null,
      functionName: null,
      args: [],
    },
    ...createEntity(active),
  };
}
