import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Header from './components/NavBar/Header';

function App(): JSX.Element {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Container>
  );
}

export default App;
