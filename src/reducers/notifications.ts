import { NotificationsActionTypes } from '../actions/notifications';

const defaultState: NotificationState = [];

function addNotification(
  state: NotificationState,
  newError: DebugNotification,
): NotificationState {
  return [...state, newError];
}

function reducer(
  state: NotificationState = defaultState,
  action: NotificationsActions,
): NotificationState {
  const { type, payload } = action;

  switch (type) {
    case NotificationsActionTypes.ADD_INFO_NOTIFICATION:
    case NotificationsActionTypes.ADD_WARNING_NOTIFICATION:
    case NotificationsActionTypes.ADD_ERROR_NOTIFICATION:
      return addNotification(state, payload);
  }

  return state;
}

export default reducer;
