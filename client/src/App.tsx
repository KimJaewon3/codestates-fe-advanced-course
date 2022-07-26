import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllPost from './pages/allPost';
import Post from './pages/detailPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AllPost/>} />
        <Route path='/post' element={<Post/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
