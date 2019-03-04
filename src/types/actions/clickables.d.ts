interface ClickableChangeActionPayload {
  polygonId: Uid;
  moduleName: string;
  functionName: string;
  args: any[];
}

interface ClickableSetActiveActionPayload {
  polygonId: Uid;
  active: boolean;
}

type ClickableAddAction = Action<Uid>;
type ClickableSetActiveAction = Action<ClickableSetActiveActionPayload>;
type ClickableChangeAction = Action<ClickableChangeActionPayload>;
type ClickableRemoveAction = Action<Uid>;
type ClickableActions =
  | ClickableAddAction
  | ClickableSetActiveAction
  | ClickableChangeAction
  | ClickableRemoveAction;
