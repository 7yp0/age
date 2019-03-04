import { filter, propEq } from 'ramda';
import { createSelector } from 'reselect';
import { NotificationLevels } from '../configs/notifications';

const propLevelEquals = propEq('level');

export const selectNotifications = (state: State) => state.notifications;

export const selectErrorNotifications = createSelector(
  selectNotifications,
  (notifications: NotificationState): DebugNotification[] => {
    return filter(propLevelEquals(NotificationLevels.Error), notifications);
  },
);

export const selectWarningNotifications = createSelector(
  selectNotifications,
  (notifications: NotificationState): DebugNotification[] => {
    return filter(propLevelEquals(NotificationLevels.Warning), notifications);
  },
);
