import React from 'react';

const DifficultySelector = ({ difficulty, setDifficulty }) => {
  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div>
      <label>
        Difficulty Level:
        <select value={difficulty} onChange={handleChange}>
          <option value="Simple">Simple (MCQ)</option>
          <option value="Hard">Hard (FIB) </option>
        </select>
      </label>
    </div>
  );
};

export default DifficultySelector;
