type GetState = () => State;
type Dispatch = (action: Action<any>) => void;

interface Window {
  getState: GetState;
  dispatch: Dispatch;
}
