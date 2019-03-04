import { __, filter, includes, prop } from 'ramda';
import { createSelector } from 'reselect';
import { selectActivePolygons, selectPolygons } from './polygons';

export const selectClickables = (state: State): Clickables => state.clickables;

export const createSelectClickableByPolygonId = (polygonId: Uid) =>
  createSelector(
    selectClickables,
    (clickables: Clickables): Clickable | undefined => {
      return prop(polygonId)(clickables);
    },
  );

export const selectClickablePolygons = createSelector(
  selectPolygons,
  selectClickables,
  (polygons: Polygons, clickables: Clickables): Polygons => {
    return filter((polygon: Polygon) => {
      return includes(prop('id', polygon), Object.keys(clickables));
    }, polygons);
  },
);

export const selectActiveClickablePolygons = createSelector(
  selectActivePolygons,
  selectClickables,
  (polygons: Polygons, clickables: Clickables): Polygons => {
    return filter((polygon: Polygon) => {
      return includes(prop('id', polygon), Object.keys(clickables));
    }, polygons);
  },
);
