import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

declare global {
  interface Window {
    wpReactPlugin: {
      appSelector: string
    } | undefined
  }
}

if (window.wpReactPlugin) {
  ReactDOM.render(
    <React.StrictMode>
      <DndProvider backend={MultiBackend as any /* Fix type error. */} options={HTML5toTouch}>
        <App />
      </DndProvider>
    </React.StrictMode>,
    document.querySelector(window.wpReactPlugin.appSelector)
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
