import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListSelector.css';

// Inlined DifficultySelector component
function DifficultySelector({ difficulty, setDifficulty }) {
  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div>
      <label>
        Difficulty Level:
        <select value={difficulty} onChange={handleChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    </div>
  );
}

// Inlined FileUploader component
const FileUploader = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

// Inlined NumberOfQuestionsInput component
const NumberOfQuestionsInput = ({ numberOfQuestions, setNumberOfQuestions }) => {
  return (
    <div className="number-of-questions-input">
      <label>
        Number of Questions:
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(e.target.value)}
          min="1"
        />
      </label>
    </div>
  );
};

const ListSelector = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    setSelectedFile(file);
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      console.error("No file selected for generation");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('mode', difficulty);
    formData.append('numberOfQuestions', numberOfQuestions.toString());

    try {
      const res = await axios.post('http://localhost:5000/api/questions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      // Pass the generated questions via state while navigating
      navigate('/listDisplay', { state: { questions: res.data.questions } });
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  };

  return (
    <div className="App">
      <div className="quiz-selector">
        <h2>Select Question Bank Preferences</h2>
        <div className="controls">
          <NumberOfQuestionsInput 
            numberOfQuestions={numberOfQuestions} 
            setNumberOfQuestions={setNumberOfQuestions} 
          />
          <DifficultySelector 
            difficulty={difficulty} 
            setDifficulty={setDifficulty} 
          />
          <FileUploader onFileUpload={handleFileUpload} />
          <button onClick={handleGenerate}>Generate</button>
        </div>
      </div>
    </div>
  );
};

export default ListSelector;
