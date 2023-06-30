import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/authProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Flashcards from './pages/Flashcards';
import Dictionary from './pages/Dictionary';
import { ListProvider } from './context/listProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <ListProvider>
            <Routes>
              <Route path="/*" element={<App/>}/>
            </Routes>
          </ListProvider>
        </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
