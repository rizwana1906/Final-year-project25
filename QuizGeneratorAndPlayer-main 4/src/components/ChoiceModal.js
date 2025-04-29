import React from 'react';

const ChoiceModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>What do you want to generate?</h2>
        <button onClick={() => onSelect('questions')}>Generate Questions</button>
        <button onClick={() => onSelect('quiz')}>Generate Quiz</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ChoiceModal;
