import React from 'react';

function NumberOfQuestionsInput({ numberOfQuestions, setNumberOfQuestions }) {
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
}

export default NumberOfQuestionsInput;
