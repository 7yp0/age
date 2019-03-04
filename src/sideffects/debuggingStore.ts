import { dispatch, getState } from '../store';

export function initializeDebuggingStore() {
  window.getState = getState;
  window.dispatch = dispatch;
}
