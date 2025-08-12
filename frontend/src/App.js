import React from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import History from './components/History';
import AnalysisPage from './components/AnalysisPage';
import { Routes, Route } from 'react-router-dom';
import './index.css';

function App() {
  return (
     <div>
          <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<History />} />
          <Route path="/analysis/:id" element={<AnalysisPage />} />
        </Routes>
      </div>
  );
}

export default App;