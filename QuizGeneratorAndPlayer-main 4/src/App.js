import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import listIcon from './components/images/List-Icon.jpg';
import quizIcon from './components/images/Quiz-Icon.jpg'; 
import QuizSelector from './components/QuizSelector';
import ListSelector from './components/ListSelector';
import QuizHome from './components/QuizHome';
import ListDisplay from './components/ListDisplay';
import QuizPlayer from './components/QuizPlayer';

// ===========================================
// Global Styles (minimal, only for the root route)
// ===========================================
const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

// ===========================================
// Styled Components (scoped ONLY to the root route)
// ===========================================
const RootContainer = styled.div`
  color: #ffffff;
  min-height: 100vh;
  padding: 20px 40px;
`;

const FloatingContainer = styled.div`
  margin-top: 2%;
  margin-bottom: 2%;
  background-color: #2c003e;
  border-radius: 30px;
  border: 2px solid #000000;
  width: 90%;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
`;

const FloatingText = styled.h1`
  animation: pulse 3s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const InteractiveIcon = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.5);
  }
`;

const Logo = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 20%;
  margin-bottom: 1rem;
`;

// ===========================================
// App Component
// ===========================================
function App() {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyles />
      <Routes>
        {/* Root route: Styles APPLIED */}
        <Route
          path="/"
          element={
            <RootContainer>
              <div className="QuizSelector d-flex justify-content-center align-items-center">
                <FloatingContainer className="p-5 text-center">
                  <Logo src={logo} alt="Quiz Game Logo" />
                  <FloatingText className="text-light">
                    Welcome to QuizBank Generator App <span role="img" aria-label="waving hand">👋</span>
                  </FloatingText>
                  <p className="text-light mt-4">
                    Please make a choice to proceed further
                  </p>
                  <div className="container-group d-flex justify-content-around mt-4">
                    <div className="c1 d-flex flex-column align-items-center">
                      <div className="c21 mb-3 text-light">Question Only Mode ↓</div>
                      <InteractiveIcon 
                        src={listIcon} 
                        alt="List Button" 
                        onClick={() => navigate('/listSelector')} 
                      />
                    </div>
                    <div className="c2 d-flex flex-column align-items-center">
                      <div className="c21 mb-3 text-light">Quiz Mode ↓</div>
                      <InteractiveIcon 
                        src={quizIcon} 
                        alt="Quiz Button" 
                        onClick={() => navigate('/quizSelector')}  
                      />
                    </div>
                  </div>
                </FloatingContainer>
              </div>
            </RootContainer>
          }
        />

        {/* Child routes: Styles NOT APPLIED */}
        <Route path="/quizSelector" element={<QuizSelector />} />
        <Route path="/listSelector" element={<ListSelector />} />
        <Route path="/quizHome" element={<QuizHome />} />
        <Route path="/quizPlayer" element={<QuizPlayer />} />
        <Route path="/listDisplay" element={<ListDisplay />} />
      </Routes>
    </>
  );
}

export default App;