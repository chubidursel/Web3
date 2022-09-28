import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router-dom"
import "./index.css";
import { Provider } from './contexts/context';
import { AppContextProvider } from './contexts/AppContext';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ AppContextProvider>
  </React.StrictMode>
)
