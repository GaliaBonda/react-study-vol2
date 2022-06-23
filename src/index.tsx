import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>

    <BrowserRouter>
    <Routes>
      <Route path="board" element={<Board />}>
      <Route path=":boardID" element={<Board />} />
      </Route>
      <Route path="/" element={<Home />}>
        
      </Route>
    </Routes>
  </BrowserRouter>
  </Provider>
  </React.StrictMode>
);
