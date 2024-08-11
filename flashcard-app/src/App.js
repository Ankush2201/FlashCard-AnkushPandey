// src/App.js

import React, { useEffect, useState } from 'react';
import Flashcard from './component/Carddisplay';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import AdminDashboard from './component/adminDashBorad';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/flashcards');
      setFlashcards(response.data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  if (flashcards.length === 0) {
    return <div>Loading flashcards...</div>;
  }

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<FlashcardPage flashcards={flashcards} currentIndex={currentIndex} handleNext={handleNext} handlePrevious={handlePrevious} />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate('/')}>Flashcards</button>
      <button onClick={() => navigate('/admin')}>Admin</button>
    </nav>
  );
}

function FlashcardPage({ flashcards, currentIndex, handleNext, handlePrevious }) {
  return (
    <>
      <h1>Flashcard App</h1>
      <Flashcard flashcard={flashcards[currentIndex]} />
      <div>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}

export default App;
