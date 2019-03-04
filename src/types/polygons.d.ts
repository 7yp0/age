type Verticies = [Point, Point] | [];

interface Polygon {
  id: Uid;
  verticies: Verticies;
}

interface Polygons {
  [id: string]: Polygon;
}

interface PolygonsState {
  temporaryPolygon: Verticies;
  polygons: Polygons;
  selectedPolygonId: Uid | null;
}
