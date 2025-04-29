import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled, { createGlobalStyle } from 'styled-components';
import logo from './images/giphy.webp';
import playIcon from './images/play-icon.png';
import instructionsIcon from './images/instructions-icon.jpg';
import { useNavigate } from 'react-router-dom';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    height: 100%;
  }
`;

const StyledQuizHome = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FloatingContainer = styled.div`
  padding: 2rem;
  text-align: center;
  background-color: #34495e;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  margin-bottom: 1.5rem;
  max-width: 200px;
`;

const FloatingText = styled.h1`
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const InstructionsText = styled.p`
  margin-top: 1.5rem;
  color: #ecf0f1;
  font-size: 1.2rem;
`;

const ContainerGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  margin: 0 1.5rem;
`;

const InteractiveIcon = styled.img`
  width: 80px;
  height: 80px;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const InstructionsPopup = styled.div`
  position: relative;
  background-color: #2c3e50;
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 1.5rem;
  color: #ecf0f1;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
`;

const InstructionList = styled.ul`
  text-align: left;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
`;

const PrimaryButton = styled.button`
  background-color: #3498db;
  color: #ecf0f1;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

function QuizHome() {
  const [showInstructions, setShowInstructions] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyles />
      <StyledQuizHome>
        <FloatingContainer className="p-5">
          <Logo src={logo} alt="Quiz Game Logo" />
          <FloatingText>
            Quiz Generated! Welcome to Quiz Room <span role="img" aria-label="waving hand">👋</span>
          </FloatingText>
          <InstructionsText>
            Test your knowledge with our exciting quizzes!
          </InstructionsText>
          
          <ContainerGroup>
            <IconContainer>
              <div className="mb-3">Start Playing ↓</div>
              <InteractiveIcon 
                src={playIcon} 
                alt="Play Button"
                onClick={() => navigate('/quizPlayer')}
              />
            </IconContainer>
            
            <IconContainer>
              <div className="mb-3">How to Play ↓</div>
              <InteractiveIcon 
                src={instructionsIcon}
                alt="Instructions Button"
                onClick={() => setShowInstructions(true)}
              />
            </IconContainer>
          </ContainerGroup>

          {showInstructions && (
            <InstructionsPopup>
              <CloseButton onClick={() => setShowInstructions(false)}>
                ✖
              </CloseButton>
              <InstructionList>
                <li>The quiz is uni-directional; once answered, you cannot go back.</li>
                <li>15 seconds per question. Correct answer shown after submission.</li>
                <li>Selected incorrect answers show in red, correct in green.</li>
                <li>6-second pause after each question before auto-advance.</li>
                <li>Quiz report highlights correct/incorrect answers.</li>
              </InstructionList>
              <PrimaryButton onClick={() => setShowInstructions(false)}>
                Okay
              </PrimaryButton>
            </InstructionsPopup>
          )}
        </FloatingContainer>
      </StyledQuizHome>
    </>
  );
}

export default QuizHome;