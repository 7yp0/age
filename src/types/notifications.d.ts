import {
  NotificationLevels,
  NotificationTypes,
} from '../configs/notifications';

declare global {
  interface DebugNotification {
    type: NotificationTypes;
    level: NotificationLevels;
    // tslint:disable-next-line:ban-types
    payload: Object;
  }

  type NotificationState = DebugNotification[];
}
