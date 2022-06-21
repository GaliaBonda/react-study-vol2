import React from 'react';

import './App.scss';
import {Link } from 'react-router-dom';

function App() {
  return (
    <div>
    <Link to="/board">Board</Link>
    <Link to="/">Home</Link>
    </div>
  //   <BrowserRouter>
  //   <Routes>
  //     <Route path="board" element={<Board />}></Route>
  //     <Route path="/" element={<Home />}>
        
        
        
  //     </Route>
  //   </Routes>
  // </BrowserRouter>
  );
}

export default App;
function createBrowserHistory() {
  throw new Error('Function not implemented.');
}

