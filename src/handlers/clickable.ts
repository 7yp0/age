import {
  add,
  curry,
  find,
  flip,
  invoker,
  isEmpty,
  isNil,
  length,
  not,
  or,
  prop,
} from 'ramda';
import { createAddErrorNotificationAction } from '../actions/notifications';
import { NotificationTypes } from '../configs/notifications';
import {
  createSelectClickableByPolygonId,
  selectActiveClickablePolygons,
} from '../selectors/clickables';
import { selectPlayerInteractionKeys } from '../selectors/configuredKeyMap';
import { selectKeyPressedMap } from '../selectors/keyPressedMap';
import { selectMouseLeftClickPosition } from '../selectors/mousePositions';
import { extendVectorToHorizontalLine } from '../utils/vector2D';
import { isPolygonIntersectingWithLine } from '../validators/polygons';

export function handleClickableClick(state: State, dispatch: Dispatch): void {
  const clickablePolygons = selectActiveClickablePolygons(state);
  const keyPressedMap = selectKeyPressedMap(state);
  const { primary } = selectPlayerInteractionKeys(state);
  const getFromKeyPressedMap = flip(prop)(keyPressedMap) as any;

  if (or(isEmpty(clickablePolygons), not(getFromKeyPressedMap(primary)))) {
    return;
  }

  const mouseLeftClickPosition = selectMouseLeftClickPosition(state);

  const horizontalLine = extendVectorToHorizontalLine(mouseLeftClickPosition);

  const intersectingPolygon: Polygon | undefined = find(
    curry(isPolygonIntersectingWithLine)(horizontalLine),
  )(Object.values(clickablePolygons));

  if (isNil(intersectingPolygon)) {
    return;
  }

  const { id } = intersectingPolygon as Polygon;

  const clickable = createSelectClickableByPolygonId(id)(state);

  if (isNil(clickable)) {
    return;
  }

  const {
    script: { moduleName, functionName, args },
  } = clickable;

  const promise = import(`../scripts/${moduleName}.ts`);
  promise
    .then(
      invoker(add(2, length(args)), functionName as string)(
        state,
        dispatch,
        ...args,
      ),
    )
    .catch(() => {
      dispatch(
        createAddErrorNotificationAction(
          NotificationTypes.ClickableScriptInvalid,
          {
            moduleName,
            functionName,
            args,
          },
        ),
      );
    });
}
