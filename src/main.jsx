import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DatabaseProvider } from './hooks/useDatabase';
import App from './App.jsx';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DatabaseProvider>
        <App />
      </DatabaseProvider>
    </BrowserRouter>
  </StrictMode>,
);
