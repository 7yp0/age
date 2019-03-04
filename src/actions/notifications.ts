import { curry } from 'ramda';
import {
  NotificationLevels,
  NotificationTypes,
} from '../configs/notifications';
import { createNotification } from '../entities/notifications';

export enum NotificationsActionTypes {
  ADD_INFO_NOTIFICATION = 'ADD_INFO_NOTIFICATION',
  ADD_WARNING_NOTIFICATION = 'ADD_WARNING_NOTIFICATION',
  ADD_ERROR_NOTIFICATION = 'ADD_ERROR_NOTIFICATION',
}

const createAddNotificationAction = curry(
  (
    type: NotificationsActionTypes,
    level: NotificationLevels,
    notificationType: NotificationTypes,
    // tslint:disable-next-line:ban-types
    payload: Object = {},
  ): AddNotificationsAction => {
    return {
      type,
      payload: createNotification(notificationType, level, payload),
    };
  },
);

export const createAddInfoNotificationAction = createAddNotificationAction(
  NotificationsActionTypes.ADD_INFO_NOTIFICATION,
  NotificationLevels.Info,
);

export const createAddWarningNotificationAction = createAddNotificationAction(
  NotificationsActionTypes.ADD_WARNING_NOTIFICATION,
  NotificationLevels.Warning,
);

export const createAddErrorNotificationAction = createAddNotificationAction(
  NotificationsActionTypes.ADD_ERROR_NOTIFICATION,
  NotificationLevels.Error,
);
