import React, { useState, useEffect, useCallback } from 'react';
// Use this for Command Prompt
// import Quizzes from '../Quizzes.json'; 
// Use this for PowerShell
import Quizzes from './Quizzes.json';
import styled, { createGlobalStyle } from 'styled-components';
import WrongLogo from './images/wrong-Logo.png';
import RightLogo from './images/right-Logo.png';

// Global styles for the body and font
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  
  body {
    background: linear-gradient(to right, #0b8793, #360033);
    color: #ffffff;
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Roboto', sans-serif;
  }
`;

// Main container for the quiz app
const StyledQuizApp = styled.div`
  padding: 2rem;
`;

// Container for the quiz content
const QuizContainer = styled.div`
  width: 100%;
//   height: 75%;
  margin: 0 auto;
//   padding: 2rem;
  border-radius: 1rem;
  background-color: #34495e;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Styling for the quiz title
const QuizTitle = styled.h2`
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #ecf0f1;
`;

// Container for the quiz options
const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

// Styling for the option buttons
const OptionButton = styled.button`
  background-color: ${props => {
    if (props.$correct) return '#00ff6a';
    if (props.$incorrect) return '#ff1900';
    if (props.$selected) return 'gray';
    return '#3d566e';
  }};
  padding: 1rem;
  border-radius: 2.5rem;
  border: 0.2rem solid ${props => {
    if (props.$correct) return '#0bff70';
    if (props.$incorrect) return '#fc200c';
    return '#3498db';
  }};
  color: #ecf0f1;
  cursor: pointer;
  text-align: center;
  width: fit-content;
  font-size: 1rem;
  transition: all 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

// Container for the quiz controls (buttons)
const QuizControls = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-top: 5px;
  align-items: center;
`;

// Styling for the control buttons
const ControlButton = styled.button`
  padding: 0.1rem 0.5rem;
  font-size: 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 5px;
  border: none;
  transition: all 0.2s;

  &.btn-primary {
    background-color: #3498db;
    color: #ecf0f1;

    &:hover {
      background-color: #2980b9;
    }
  }

  &.btn-danger {
    background-color: #e74c3c;
    color: #ecf0f1;

    &:hover {
      background-color: #c0392b;
    }
  }

  &.btn-success {
    background-color: #28a745;
    color: #ecf0f1;

    &:hover {
      background-color: #218838;
    }
  }

  &.btn-secondary {
    background-color: #6c757d;
    color: #ecf0f1;

    &:hover {
      background-color: #5a6268;
    }
  }
`;

// Styling for the quiz report section
const QuizReport = styled.div`
  align-items: center;
  text-align: center;
  margin: auto 0;
`;

// Styling for the report table
const ReportTable = styled.table`
  &.table-dark {
    background-color: #34495e;

    tr.table-success {
      background-color: #0bff70 !important;
      color: #ffffff !important;
    }

    tr.table-danger {
      background-color: #e74c3c !important;
      color: #ffffff !important;
    }
  }
`;

// Container for the option and logo
const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1px;
`;

// Styling for the option logo (correct/wrong icons)
const OptionLogo = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: 1rem;
`;

// Styling for the quiz timer section
const QuizTimer = styled.div`
  p {
    display: inline-block;
    margin: 0 1rem;
  }
`;

function QuizPlayer() {
  const [currentQuiz] = useState({ name: "Generated Quiz", questions: Quizzes });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userChoice, setUserChoice] = useState('NA');
  const [timeLeft, setTimeLeft] = useState(15);
  const [totalTime, setTotalTime] = useState(0);
  const [score, setScore] = useState(0);
  const [autoNextTime, setAutoNextTime] = useState(8);
  const [isAnswered, setIsAnswered] = useState(false);
  const [responses, setResponses] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Choose your option and click on save");

  useEffect(() => {
    if (currentQuiz) {
      const updatedResponses = currentQuiz.questions.map(question => ({
        chosenOption: 'NA',
        correctAnswer: question.answer,
        isCorrect: false
      }));
      setResponses(updatedResponses);
    }
  }, [currentQuiz]);

  const handleOptionSelect = (option) => {
    if (!isAnswered) {
      setUserChoice(option);
    }
  };

  const handleSave = useCallback(() => {
    if (!isAnswered) {
      const currentQuestion = currentQuiz.questions[currentQuestionIndex];
      const correctAnswer = currentQuestion.answer;
      const isCorrect = userChoice === correctAnswer;
      
      const updatedResponses = [...responses];
      updatedResponses[currentQuestionIndex] = {
        chosenOption: userChoice,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect
      };
      setResponses(updatedResponses);
  
      setIsAnswered(true);
      
      if (userChoice === 'NA') {
        setUserChoice(correctAnswer);
        setStatusMessage("No response received, displaying the correct answer");
      } else {
        if (isCorrect) {
          setScore(s => s + 1);
          setStatusMessage("Correct answer, keep going champ!");
        } else {
          setStatusMessage("Better luck next time!");
        }
      }
  
      if (currentQuestionIndex === currentQuiz.questions.length - 1) {
        setQuizCompleted(true);
      }
    }
  }, [isAnswered, currentQuiz, currentQuestionIndex, userChoice, responses]);

  const handleNext = useCallback(() => {
    setIsAnswered(false);
    setUserChoice('NA');
    setAutoNextTime(8);
    setTimeLeft(15);
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setStatusMessage("Choose your option and click on save");
    }
  }, [currentQuestionIndex, currentQuiz]);

  useEffect(() => {
    if (currentQuiz && !isAnswered) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            handleSave();
            return 0;
          }
          return prevTime - 1;
        });
        setTotalTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentQuiz, isAnswered, handleSave]);

  useEffect(() => {
    if (isAnswered && autoNextTime > 0) {
      const interval = setInterval(() => {
        setAutoNextTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            handleNext();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isAnswered, autoNextTime, handleNext]);

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setUserChoice('NA');
    setTimeLeft(15);
    setTotalTime(0);
    setScore(0);
    setAutoNextTime(5);
    setIsAnswered(false);
    setResponses(currentQuiz.questions.map(question => ({
      chosenOption: 'NA',
      correctAnswer: question.answer,
      isCorrect: false
    })));
    setQuizCompleted(false);
    setStatusMessage("Choose your option and click on save");
  };

  const handleSubmit = () => {
    const completedResponses = responses.map((response, index) => 
      response.chosenOption === 'NA' ? {
        chosenOption: 'NA',
        correctAnswer: currentQuiz.questions[index].answer,
        isCorrect: false
      } : response
    );
    setResponses(completedResponses);
    setQuizCompleted(true);
  };

  const calculateScorePercentage = () => {
    return Math.round((score / currentQuiz.questions.length) * 100);
  };

  return (
    <>
      <GlobalStyles />
      <StyledQuizApp>
        {quizCompleted ? (
          <QuizReport>
            <h2><b>Quiz Completed Successfully</b></h2><br />
            <h2>Your Score is {calculateScorePercentage()}%</h2><br />
            <h2>Here is your Quiz Summary</h2>
            <ReportTable className="report-table table table-bordered table-dark">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Question</th>
                  <th>Chosen Option</th>
                  <th>Correct Answer</th>
                  <th>Scored Correct</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response, index) => (
                  <tr key={index} className={response.isCorrect ? 'table-success' : 'table-danger'}>
                    <td>{index + 1}</td>
                    <td>{currentQuiz.questions[index].question}</td>
                    <td>{response.chosenOption}</td>
                    <td>{response.correctAnswer}</td>
                    <td>{response.isCorrect ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </ReportTable>
            <ControlButton className="btn btn-primary" onClick={handleReset}>
              Restart Quiz
            </ControlButton>
          </QuizReport>
        ) : (
          <QuizContainer>
            <QuizTitle>{currentQuiz.name}</QuizTitle>
            <p className="quiz-question">Question {currentQuestionIndex + 1}/{currentQuiz.questions.length}</p>
            <p className="quiz-question">{currentQuiz.questions[currentQuestionIndex].question}</p>
            <p className="status-message">{statusMessage}</p>
            <OptionsContainer>
              {currentQuiz.questions[currentQuestionIndex].options.map((option) => {
                const correctAnswer = currentQuiz.questions[currentQuestionIndex].answer;
                const isCorrect = option === correctAnswer;
                const isSelected = option === userChoice;
                const showCorrect = isAnswered && isCorrect;
                const showWrong = isAnswered && isSelected && !isCorrect;

                return (
                  <OptionContainer key={option}>
                    <OptionButton
                      $selected={isSelected}
                      $correct={showCorrect}
                      $incorrect={showWrong}
                      onClick={() => handleOptionSelect(option)}
                      disabled={isAnswered}
                    >
                      {option}
                    </OptionButton>
                    {(showCorrect || showWrong) && (
                      <OptionLogo
                        src={showCorrect ? RightLogo : WrongLogo}
                        alt={showCorrect ? "Correct" : "Incorrect"}
                      />
                    )}
                  </OptionContainer>
                );
              })}
            </OptionsContainer>
            <QuizControls>
              <ControlButton className="btn btn-danger" onClick={handleReset}>
                Reset
              </ControlButton>
              <ControlButton
                className="btn btn-primary"
                onClick={handleSave}
                disabled={isAnswered}
              >
                Save Answer
              </ControlButton>
              <ControlButton
                className="btn btn-secondary"
                onClick={handleNext}
                disabled={!isAnswered}
              >
                Next
              </ControlButton>
              <ControlButton
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Submit Quiz
              </ControlButton>
            </QuizControls>
            {isAnswered && (
              <div className="auto-save-timer">
                <p>Auto save in: {autoNextTime} seconds</p>
              </div>
            )}
            <QuizTimer>
              <p>Time left: {timeLeft} seconds</p>
              <p>Total time: {Math.floor(totalTime / 60)} min {totalTime % 60} sec</p>
              <p>Total score: {score}</p>
            </QuizTimer>
          </QuizContainer>
        )}
      </StyledQuizApp>
    </>
  );
}

export default QuizPlayer;
