import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Offline, Online } from 'react-detect-offline';
import { Alert } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Online>
      <App />
    </Online>
    <Offline>
      <Alert
        message="No Internet Connection"
        description="Please check your internet connection and try again."
        type="error"
      />
    </Offline>
  </React.StrictMode>,
);
