import { isEmpty, isNil, not, omit, prop } from 'ramda';
import { ClickablesActionTypes } from '../actions/clickables';
import { PolygonsActionTypes } from '../actions/polygons';
import { createClickable } from '../entities/clickables';
import { getEditorState } from '../sideffects/editorState';

const loadedState = getEditorState();

const defaultState: Clickables = not(isEmpty(loadedState))
  ? loadedState.clickables
  : {};

function addClickable(state: Clickables, polygonId: Uid): Clickables {
  const clickable = createClickable(polygonId);

  return {
    ...state,
    [clickable.polygonId]: clickable,
  };
}

function setActiveClickable(
  state: Clickables,
  { polygonId, active }: ClickableSetActiveActionPayload,
): Clickables {
  const clickable = prop(polygonId)(state);

  return {
    ...state,
    [clickable.polygonId]: {
      ...clickable,
      active,
    },
  };
}

function removeClickable(state: Clickables, polygonId: Uid): Clickables {
  return omit([polygonId], state);
}

function changeClickable(
  state: Clickables,
  { polygonId, moduleName, functionName, args }: ClickableChangeActionPayload,
): Clickables {
  const clickable = prop(polygonId)(state);

  if (isNil(clickable)) {
    return state;
  }

  return {
    ...state,
    [clickable.polygonId]: {
      ...clickable,
      script: {
        ...clickable.script,
        moduleName,
        functionName,
        args,
      },
    },
  };
}

function reducer(
  state: Clickables = defaultState,
  action: ClickableActions,
): Clickables {
  const { type, payload } = action;

  switch (type) {
    case ClickablesActionTypes.CLICKABLE_ADD: {
      return addClickable(state, payload as Uid);
    }

    case ClickablesActionTypes.CLICKABLE_SET_ACTIVE: {
      return setActiveClickable(
        state,
        payload as ClickableSetActiveActionPayload,
      );
    }

    case ClickablesActionTypes.CLICKABLE_CHANGE: {
      return changeClickable(state, payload as ClickableChangeActionPayload);
    }

    case PolygonsActionTypes.DELETE_POLYGON:
    case ClickablesActionTypes.CLICKABLE_REMOVE: {
      return removeClickable(state, payload as Uid);
    }
  }

  return state;
}

export default reducer;
