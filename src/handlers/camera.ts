import { equals, forEachObjIndexed, map, or } from 'ramda';
import isEmpty from 'ramda/es/isEmpty';
import { createPlayerSetPositionAction } from '../actions/player';
import { createSetPolygonVerticiesAction } from '../actions/polygons';
import {
  selectCameraMovingDistance,
  selectCameraPosition,
  selectLastCameraPosition,
} from '../selectors/camera';
import { selectPlayerPosition } from '../selectors/player';
import { selectPolygons } from '../selectors/polygons';
import { subtractVectors } from '../utils/vector2D';

export function handlePlayerAndCameraSync(
  state: State,
  dispatch: Dispatch,
): void {
  const cameraMovingDistance = selectCameraMovingDistance(state);
  const cameraPosition = selectCameraPosition(state);
  const lastCameraPosition = selectLastCameraPosition(state);
  const playerPosition = selectPlayerPosition(state);

  if (equals(cameraPosition, lastCameraPosition)) {
    return;
  }

  dispatch(
    createPlayerSetPositionAction(
      subtractVectors(playerPosition, cameraMovingDistance),
    ),
  );
}

export function handlePolygonAndCameraSync(
  state: State,
  dispatch: Dispatch,
): void {
  const cameraMovingDistance = selectCameraMovingDistance(state);
  const cameraPosition = selectCameraPosition(state);
  const lastCameraPosition = selectLastCameraPosition(state);
  const polygons = selectPolygons(state);

  if (or(equals(cameraPosition, lastCameraPosition), isEmpty(polygons))) {
    return;
  }

  forEachObjIndexed(({ id, verticies }: Polygon) => {
    const syncedVerticies = map((vertex: Point) => {
      return subtractVectors(vertex, cameraMovingDistance);
    }, verticies) as Verticies;
    dispatch(createSetPolygonVerticiesAction(id, syncedVerticies));
  }, polygons);
}
