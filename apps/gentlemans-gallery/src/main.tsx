import { StrictMode } from 'react';
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import App from './app/app';

const rootNode = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootNode!);

root.render(<StrictMode><App /></StrictMode>);
