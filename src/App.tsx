import React from 'react';

import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="board">
          <Route path=":boardID" element={<Board board={{
            id: "",
            title: "string",
            lists: [],
          }} />} />
        </Route>
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
function createBrowserHistory() {
  throw new Error('Function not implemented.');
}

