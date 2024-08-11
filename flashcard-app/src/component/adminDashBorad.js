// src/components/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admindashboard.css';

const AdminDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [editingId, setEditingId] = useState(null);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/api/flashcards', formData);
      setFormData({ question: '', answer: '' });
      fetchFlashcards();
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const handleEdit = (flashcard) => {
    setEditingId(flashcard.id);
    setFormData({ question: flashcard.question, answer: flashcard.answer });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/flashcards/${editingId}`,
        formData
      );
      setEditingId(null);
      setFormData({ question: '', answer: '' });
      fetchFlashcards();
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
      fetchFlashcards();
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={formData.question}
          onChange={handleChange}
        />
        <input
          type="text"
          name="answer"
          placeholder="Answer"
          value={formData.answer}
          onChange={handleChange}
        />
        {editingId ? (
          <button onClick={handleUpdate}>Update Flashcard</button>
        ) : (
          <button onClick={handleAdd}>Add Flashcard</button>
        )}
      </div>
      <ul>
        {flashcards.map((flashcard) => (
          <li key={flashcard.id}>
            <strong>{flashcard.question}</strong> - {flashcard.answer}
            <button onClick={() => handleEdit(flashcard)}>Edit</button>
            <button onClick={() => handleDelete(flashcard.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
