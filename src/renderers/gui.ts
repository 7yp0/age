import { memoizeWith, prop } from 'ramda';
import { updateState as updateGuiState } from '../gui';

const renderGui = memoizeWith(prop('version') as any, (state: State) => {
  updateGuiState();

  return state;
});

export function drawGui(state: State, context: CanvasRenderingContext2D): void {
  renderGui(state);
}
