// src/components/Flashcard.js

import React, { useState } from 'react';
import './FlashCards.css'; // You'll create this CSS file for styling

const Flashcard = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="front">
        <p>{flashcard.question}</p>
      </div>
      <div className="back">
        <p>{flashcard.answer}</p>
      </div>
    </div>
  );
};

export default Flashcard;
