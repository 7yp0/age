import * as gameState from '../assets/gameState.json';
import config from '../configs';
import { getState } from '../store';
import { logError } from './log';

export function getEditorState(): State {
  const { default: state } = gameState as unknown as GameState;

  return state;
}

export function saveEditorState() {
  const data = JSON.stringify(getState());

  fetch(config.buildServerUrl, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    referrer: 'no-referrer',
    body: data,
  }).catch((error: Error) => logError(error));
}
