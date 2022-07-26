import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllPost from './pages/allPost';
import DetailPost from './pages/detailPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AllPost/>} />
        <Route path='/detailPost' element={<DetailPost/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
