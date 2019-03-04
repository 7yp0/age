type ConfiguredKeyMapChangeAction = Action<ConfiguredKeyMap>;
type ConfiguredKeyMapResetAction = Action<undefined>;
type ConfiguredKeyMapActions =
  | ConfiguredKeyMapChangeAction
  | ConfiguredKeyMapResetAction;
