import * as React from 'react';
import { dispatch, getState } from '../store';

interface Props {
  children: any;
}

const { Provider, Consumer: StateConsumer } = React.createContext({
  state: getState(),
  dispatch,
});

export const Consumer = StateConsumer;

export default class EnhancedProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = getState();
    this.updateState = this.updateState.bind(this);
  }

  public updateState() {
    this.setState(getState());
  }

  public render() {
    return (
      <Provider
        value={{
          state: this.state,
          dispatch,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
