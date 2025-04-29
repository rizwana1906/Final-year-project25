import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column; /* Stack children vertically */
  gap: 20px; /* Add gap between QuestionBox and ButtonsContainer */
  padding: 40px 60px;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 2.5em;
  font-weight: bold;
  color:rgb(254, 255, 255);
  margin-bottom: 20px;
  text-align: center;
`;

const QuestionBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  background-color: #f0f0f0;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 10px;
`;

const QuestionList = styled.ol`
  padding-left: 0;
  margin: 0;
  list-style-position: inside;
`;

const QuestionItem = styled.li`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  padding: 10px;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Space between buttons */
  align-items: center;
  gap: 20px; /* Add a gap between buttons */
`;

const SaveButton = styled.button`
  background-color:rgb(198, 4, 246);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.3s;
  flex: 1; /* Allow buttons to grow equally */
  &:hover {
    background-color: #004d40;
    transform: scale(1.05);
  }
`;

const BackLink = styled(Link)`
  background-color: rgb(198, 4, 246);
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.3s;
  flex: 1; /* Allow buttons to grow equally */
  text-align: center;
  &:hover {
    background-color: #004d40;
    transform: scale(1.05);
  }
`;

const QuestionDisplay = () => {
  const location = useLocation();
  const { questions } = location.state || { questions: [] };

  const handleSaveQuestions = () => {
    if (!questions || questions.length === 0) {
      alert("No questions available to save.");
      return;
    }
    const content = questions.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_questions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Container>
      <Heading>Generated Questions List</Heading>
      <QuestionBox>
        {questions && questions.length > 0 ? (
          <QuestionList>
            {questions.map((question, index) => (
              <QuestionItem key={index}>
                {question}
              </QuestionItem>
            ))}
          </QuestionList>
        ) : (
          <ErrorMessage>No questions available.</ErrorMessage>
        )}
      </QuestionBox>
      <ButtonsContainer>
        <BackLink to="/">Back to Home</BackLink>
        <SaveButton onClick={handleSaveQuestions}>Save Questions</SaveButton>
      </ButtonsContainer>
    </Container>
  );
};

export default QuestionDisplay;