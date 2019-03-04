type Handler = (state: State, dispatch: Dispatch) => void;

interface HandlerObject {
  [key: string]: Handler;
}
