import loadedState from 'store';

const localStorageGameKey = 'AUTOSAVE';

export function saveGameState(
  localStorageKey: string = localStorageGameKey,
  state: State,
) {
  loadedState.set(localStorageKey, state);
}

export function loadGameState(
  localStorageKey: string = localStorageGameKey,
): State {
  return loadedState.get(localStorageKey);
}
