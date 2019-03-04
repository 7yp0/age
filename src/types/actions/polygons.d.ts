interface SetPolygonVerticiesActionPayload {
  id: Uid;
  verticies: Verticies;
}

type AddVertexToTemporaryPolygonAction = Action<Point>;
type AddTemporaryPolygonToPolygonsAction = Action<Polygon>;
type ClearTemporaryPolygonAction = Action<undefined>;
type SelectPolygonAction = Action<Uid>;
type DeselectPolygonAction = Action<undefined>;
type DeletePolygonAction = Action<Uid>;
type SetPolygonVerticiesAction = Action<SetPolygonVerticiesActionPayload>;
type PolygonsActions =
  | AddVertexToTemporaryPolygonAction
  | AddTemporaryPolygonToPolygonsAction
  | ClearTemporaryPolygonAction
  | SelectPolygonAction
  | DeselectPolygonAction
  | DeletePolygonAction
  | SetPolygonVerticiesAction;
