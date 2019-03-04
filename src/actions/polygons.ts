import { createPolygon } from '../entities/polygon';

export enum PolygonsActionTypes {
  ADD_VERTEX_TO_TEMPORARY_POLYGON = 'ADD_VERTEX_TO_TEMPORARY_POLYGON',
  ADD_TEMPORARY_POLYGON_TO_POLYGONS = 'ADD_TEMPORARY_POLYGON_TO_POLYGONS',
  CLEAR_TEMPORARY_POLYGON = 'CLEAR_TEMPORARY_POLYGON',
  CHANGE_POLYGON_TYPE = 'CHANGE_POLYGON_TYPE',
  SELECT_POLYGON = 'SELECT_POLYGON',
  DESELECT_POLYGON = 'DESELECT_POLYGON',
  DELETE_POLYGON = 'DELETE_POLYGON',
  SET_POLYGON_VERTICIES = 'SET_POLYGON_VERTICIES',
}

export const createAddVertexToTemporaryPolygonAction = (
  vertex: Point,
): AddVertexToTemporaryPolygonAction => ({
  type: PolygonsActionTypes.ADD_VERTEX_TO_TEMPORARY_POLYGON,
  payload: vertex,
});

export const createAddTemporaryPolygonToPolygonsAction = (
  verticies: Verticies,
): AddTemporaryPolygonToPolygonsAction => ({
  type: PolygonsActionTypes.ADD_TEMPORARY_POLYGON_TO_POLYGONS,
  payload: createPolygon(verticies),
});

export const createClearTemporaryPolygonAction = (): ClearTemporaryPolygonAction => ({
  type: PolygonsActionTypes.CLEAR_TEMPORARY_POLYGON,
  payload: undefined,
});

export const createSelectPolygonAction = (id: Uid): SelectPolygonAction => ({
  type: PolygonsActionTypes.SELECT_POLYGON,
  payload: id,
});

export const createDeselectPolygonAction = (): DeselectPolygonAction => ({
  type: PolygonsActionTypes.DESELECT_POLYGON,
  payload: undefined,
});

export const createDeletePolygonAction = (id: Uid): DeletePolygonAction => ({
  type: PolygonsActionTypes.DELETE_POLYGON,
  payload: id,
});

export const createSetPolygonVerticiesAction = (
  id: Uid,
  verticies: Verticies,
): SetPolygonVerticiesAction => ({
  type: PolygonsActionTypes.SET_POLYGON_VERTICIES,
  payload: {
    id,
    verticies,
  },
});
