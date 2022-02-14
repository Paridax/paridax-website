import React from 'react';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import * as Pg from './pages';

function App() {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Pg.Landing />} />

        <Route path="/dev">
          <Route path="/dev" element={<Navigate to="/" />} />
        </Route> 
        <Route path="*" element={<Pg.NotFound />} />
      </Routes>
    </div>
  );
}

// < Route path="test" element={<Pg.Loading />} / >

export default App;