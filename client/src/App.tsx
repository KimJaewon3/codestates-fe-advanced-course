import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllPost from './pages/allPost';
import DetailPost from './pages/detailPost';
import styled from 'styled-components';

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <StyledSection>
        <Routes>
          <Route path='/' element={<AllPost/>} />
          <Route path='/detailPost' element={<DetailPost/>} />
        </Routes>
      </StyledSection>
    </BrowserRouter>
  );
}

const StyledSection = styled.section`
  margin: 0 20vw 0 20vw;
`;
