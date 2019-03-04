import { v1 as uuid } from 'uuid';

export function createPolygon(verticies: Verticies): Polygon {
  return {
    id: uuid(),
    verticies,
  };
}
