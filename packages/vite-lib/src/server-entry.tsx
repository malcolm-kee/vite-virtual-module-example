import * as ReactDomServer from 'react-dom/server';
import { App } from './app';

export function render() {
  return ReactDomServer.renderToString(<App />);
}
