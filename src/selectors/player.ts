import { createSelector } from 'reselect';

export const selectPlayer = (state: State) => state.player;

export const selectPlayerPosition = createSelector(
  selectPlayer,
  (player: Player): Point => {
    return player.position;
  },
);

export const selectPlayerSize = createSelector(
  selectPlayer,
  (player: Player): Size => {
    return player.size;
  },
);
