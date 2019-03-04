import { initialAction } from './actions/initial';
import logToConsole from './middlewares/logToConsole';
import reducers from './reducers/index';

const middlewares: Middleware[] = [logToConsole];

function callReducers(action: Action<any> = initialAction): State {
  return Object.keys(reducers).reduce((previous: any, key: string): any => {
    const reducerState = state ? state[key] : undefined;
    const newReducerState = reducers[key](reducerState, action);

    return {
      ...previous,
      [key]: newReducerState,
    };
  }, {});
}

function getNewState(action: Action<any>): State {
  const newAction = middlewares.reduce(
    (previousAction: Action<any>, middleware: Middleware): Action<any> => {
      return middleware(previousAction);
    },
    action,
  );

  const newState = callReducers(newAction);

  return newState;
}

let state: State = getNewState(initialAction);

export function getState(): State {
  return state;
}
export function dispatch(action: Action<any>) {
  state = getNewState(action);
}
