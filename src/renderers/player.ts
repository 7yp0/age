import { selectPlayerPosition, selectPlayerSize } from '../selectors/player';

export function drawPlayer(
  state: State,
  context: CanvasRenderingContext2D,
): void {
  const { width: playerWidth, height: platerHeight } = selectPlayerSize(state);
  const { x: playerX, y: playerY } = selectPlayerPosition(state);

  context.fillStyle = '#00FF00';
  context.fillRect(playerX, playerY, playerWidth, platerHeight);
}
