export enum ClickablesActionTypes {
  CLICKABLE_ADD = 'CLICKABLE_ADD',
  CLICKABLE_CHANGE = 'CLICKABLE_CHANGE',
  CLICKABLE_REMOVE = 'CLICKABLE_REMOVE',
  CLICKABLE_SET_ACTIVE = 'CLICKABLE_SET_ACTIVE',
}

export const createAddClickableAction = (
  polygonId: Uid,
): ClickableAddAction => {
  return {
    type: ClickablesActionTypes.CLICKABLE_ADD,
    payload: polygonId,
  };
};

export const createSetClickableActiveAction = (
  polygonId: Uid,
  active: boolean,
): ClickableSetActiveAction => {
  return {
    type: ClickablesActionTypes.CLICKABLE_SET_ACTIVE,
    payload: {
      polygonId,
      active,
    },
  };
};

export const createChangeClickableAction = (
  polygonId: Uid,
  moduleName: string,
  functionName: string,
  args: any[],
): ClickableChangeAction => {
  return {
    type: ClickablesActionTypes.CLICKABLE_CHANGE,
    payload: {
      polygonId,
      moduleName,
      functionName,
      args,
    },
  };
};

export const createRemoveClickableAction = (
  polygonId: Uid,
): ClickableRemoveAction => {
  return {
    type: ClickablesActionTypes.CLICKABLE_REMOVE,
    payload: polygonId,
  };
};
