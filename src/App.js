import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Components/pages/Login';
import Home from './Components/pages/Home';
import Signupform from './Components/pages/Signupform';
import Protected from './Components/Protected';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signupform/>} />
        <Route path="/home" element={<Protected><Home /></Protected>} />
        <Route path="*" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
