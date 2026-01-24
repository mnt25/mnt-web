import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App.tsx';
import { ThemeProvider } from './src/context/ThemeContext.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);