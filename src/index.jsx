import React from "react";
import "./styles/color.css";
import "./styles/font.css";
import ReactDOM from 'react-dom/client'
import App from "./App";
import "./styles/index.css";
import "./styles/tailwind.css";
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
  </React.StrictMode>,
);
