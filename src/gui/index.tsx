import * as React from 'react';
import * as ReactDOM from 'react-dom';
import config from '../configs';
import Editor from './components/editor';
import EnhancedProvider from './uiState';

export let updateState: () => void;

function render() {
  const Gui = () => (
    <EnhancedProvider
      ref={(provider: EnhancedProvider) => {
        updateState = provider.updateState;
      }}
    >
      {config.isDevelopment && <Editor />}
      {/* TODO add Game GUI here */}
    </EnhancedProvider>
  );

  const element = document.querySelector('#root-gui');

  ReactDOM.render(<Gui />, element);
}

export default render;
