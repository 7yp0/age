export enum InitialActionTypes {
  INIT = 'INIT',
}

export const initialAction: Action<undefined> = {
  type: InitialActionTypes.INIT,
  payload: undefined,
};
