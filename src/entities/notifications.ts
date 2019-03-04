import {
  NotificationLevels,
  NotificationTypes,
} from '../configs/notifications';
export function createNotification(
  type: NotificationTypes,
  level: NotificationLevels,
  // tslint:disable-next-line:ban-types
  payload: Object,
): DebugNotification {
  return {
    type,
    level,
    payload,
  };
}
