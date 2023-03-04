import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { App } from './layout/app/App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

// initialize ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// redux application
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
