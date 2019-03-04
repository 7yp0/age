import { __, filter, includes, isNil, prop, propEq } from 'ramda';
import { createSelector } from 'reselect';

export const selectPolygonsState = (state: State) => state.polygons;

export const selectPolygons = createSelector(
  selectPolygonsState,
  (polygonsState: PolygonsState): Polygons => {
    return polygonsState.polygons;
  },
);

export const selectActivePolygons = createSelector(
  selectPolygons,
  (polygons: Polygons): Polygons => {
    return filter(propEq('active', true), polygons);
  },
);

export const selectTemporaryPolygon = createSelector(
  selectPolygonsState,
  (polygonsState: PolygonsState): Verticies => {
    return polygonsState.temporaryPolygon;
  },
);

export const selectSelectedPolygonId = createSelector(
  selectPolygonsState,
  (polygonsState: PolygonsState): Uid | null => {
    return polygonsState.selectedPolygonId;
  },
);

export const selectSelectedPolygon = createSelector(
  selectPolygons,
  selectSelectedPolygonId,
  (polygons: Polygons, id: Uid | null): Polygon | null => {
    if (isNil(id)) {
      return null;
    }

    return prop(id)(polygons);
  },
);

export const selectIsPolygonSelected = createSelector(
  selectSelectedPolygon,
  (polygon: Polygon | null): boolean => {
    return Boolean(polygon);
  },
);

export const createSelectPolygonById = (id: Uid) =>
  createSelector(
    selectPolygons,
    (polygons: Polygons): Polygon | undefined => {
      return prop(id)(polygons);
    },
  );

export const createSelectPolygonsByIds = (ids: Uid[]) =>
  createSelector(
    selectPolygons,
    (polygons: Polygons): Polygons => {
      return filter((polygon: Polygon) => {
        return includes(prop('id', polygon), ids);
      }, polygons);
    },
  );
