import React from 'react';

import './App.scss';
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';
import { history } from './common/utils/history';


function App() {


  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="board">
          <Route path=":boardID" element={<Board />} />
        </Route>
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;

