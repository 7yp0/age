import { append, isEmpty, not, omit, uniq } from 'ramda';
import { PolygonsActionTypes } from '../actions/polygons';
import { getEditorState } from '../sideffects/editorState';

const loadedState = getEditorState();

const defaultState: PolygonsState = not(isEmpty(loadedState))
  ? loadedState.polygons
  : {
    temporaryPolygon: [],
    polygons: {},
    selectedPolygonId: null,
  };

function addVertexToTemporaryPolygon(
  state: PolygonsState,
  vertex: Point,
): PolygonsState {
  return {
    ...state,
    temporaryPolygon: uniq(append(vertex, state.temporaryPolygon)) as Verticies,
  };
}

function addTemporaryPolygonToPolygons(
  state: PolygonsState,
  polygon: Polygon,
): PolygonsState {
  return {
    ...state,
    temporaryPolygon: [],
    polygons: {
      ...state.polygons,
      [polygon.id]: polygon,
    },
  };
}

function clearTemporaryPolygon(state: PolygonsState): PolygonsState {
  return {
    ...state,
    temporaryPolygon: [],
  };
}

function selectPolygon(state: PolygonsState, id: Uid): PolygonsState {
  return {
    ...state,
    selectedPolygonId: id,
  };
}

function deselectPolygon(state: PolygonsState): PolygonsState {
  return {
    ...state,
    selectedPolygonId: null,
  };
}

function deletePolygon(state: PolygonsState, id: Uid): PolygonsState {
  return {
    ...state,
    polygons: omit([id], state.polygons),
  };
}

function setPolygonVerticies(
  state: PolygonsState,
  id: Uid,
  verticies: Verticies,
): PolygonsState {
  return {
    ...state,
    polygons: {
      ...state.polygons,
      [id]: {
        ...state.polygons[id],
        verticies,
      },
    },
  };
}

function reducer(
  state: PolygonsState = defaultState,
  action: PolygonsActions,
): PolygonsState {
  const { type, payload } = action;

  switch (type) {
    case PolygonsActionTypes.ADD_VERTEX_TO_TEMPORARY_POLYGON: {
      const vertex = payload as Point;

      return addVertexToTemporaryPolygon(state, vertex);
    }

    case PolygonsActionTypes.ADD_TEMPORARY_POLYGON_TO_POLYGONS: {
      const polygon = payload as Polygon;

      return addTemporaryPolygonToPolygons(state, polygon);
    }

    case PolygonsActionTypes.CLEAR_TEMPORARY_POLYGON: {
      return clearTemporaryPolygon(state);
    }

    case PolygonsActionTypes.SELECT_POLYGON: {
      const id = payload as Uid;
      return selectPolygon(state, id);
    }

    case PolygonsActionTypes.DESELECT_POLYGON: {
      return deselectPolygon(state);
    }

    case PolygonsActionTypes.DELETE_POLYGON: {
      const id = payload as Uid;
      return deletePolygon(state, id);
    }

    case PolygonsActionTypes.SET_POLYGON_VERTICIES: {
      const { id, verticies } = payload as SetPolygonVerticiesActionPayload;
      return setPolygonVerticies(state, id, verticies);
    }
  }

  return state;
}

export default reducer;
