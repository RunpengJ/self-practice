import './App.css';
import React, { useState } from 'react';
import Card from './components/Card';
import cardData from './flashcards';

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [masteredCards, setMasteredCards] = useState([]);
  const [showMastered, setShowMastered] = useState(false);

  // Get active cards (not mastered)
  const activeCards = cardData.filter((_, index) => !masteredCards.includes(index));
  
  // Get the actual card data to display
  const getCurrentCard = () => {
    if (showMastered) {
      const masteredCardData = masteredCards.map(index => cardData[index]);
      return masteredCardData[currentCardIndex];
    }
    return activeCards[currentCardIndex];
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  }

  const handleNextCard = () => {
    const maxIndex = showMastered ? masteredCards.length - 1 : activeCards.length - 1;
    if (currentCardIndex < maxIndex) {
      setCurrentCardIndex(currentCardIndex + 1);
      resetCardState();
    }
  }

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      resetCardState();
    }
  }

  const resetCardState = () => {
    setIsFlipped(false);
    setUserGuess('');
    setFeedback('');
    setIsCorrect(false);
  }

  const handleReset = () => {
    setCurrentCardIndex(0);
    resetCardState();
  }

  const handleMasterCard = () => {
    if (showMastered) return; // Can't master cards when viewing mastered list
    
    // Get the original index of the current active card
    const activeCard = activeCards[currentCardIndex];
    const originalIndex = cardData.findIndex(card => card === activeCard);
    
    // Add to mastered cards
    setMasteredCards(prev => [...prev, originalIndex]);
    
    // Reset card state
    resetCardState();
    
    // Adjust current index if needed
    if (currentCardIndex >= activeCards.length - 1) {
      setCurrentCardIndex(Math.max(0, activeCards.length - 2));
    }
  };

  const handleUnmasterCard = () => {
    if (!showMastered) return; // Can only unmaster when viewing mastered list
    
    const masteredCardIndex = masteredCards[currentCardIndex];
    
    // Remove from mastered cards
    setMasteredCards(prev => prev.filter(index => index !== masteredCardIndex));
    
    // Reset card state
    resetCardState();
    
    // Adjust current index if needed
    if (currentCardIndex >= masteredCards.length - 1) {
      setCurrentCardIndex(Math.max(0, masteredCards.length - 2));
    }
  };

  const toggleMasteredView = () => {
    setShowMastered(!showMastered);
    setCurrentCardIndex(0);
    resetCardState();
  };

  const handleSubmitGuess = () => {
    if (userGuess.trim() === '') return;

    const currentCard = getCurrentCard();
    const correctAnswer = currentCard.back.toLowerCase();
    const userAnswer = userGuess.toLowerCase().trim();

    const guessIsCorrect = correctAnswer === userAnswer || 
                          correctAnswer.includes(userAnswer) || 
                          userAnswer.includes(correctAnswer);

    setFeedback(guessIsCorrect ? 'correct' : 'incorrect');
    setIsCorrect(guessIsCorrect);
    
    // Clear the input for incorrect answers to allow retry
    if (!guessIsCorrect) {
      setUserGuess('');
    }
  }

  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
    // Clear feedback when user starts typing again after an incorrect answer
    if (feedback === 'incorrect') {
      setFeedback('');
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmitGuess();
    }
  }

  // Check if there are any cards to display
  const currentCards = showMastered ? masteredCards : activeCards;
  const totalCards = showMastered ? masteredCards.length : activeCards.length;

  if (totalCards === 0) {
    return (
      <div className="App">
        <header className="header">
          <h1>🧠 Machine Learning Quiz</h1>
          <p className="subtitle">Master the fundamentals of ML concepts</p>
        </header>
        <main className="main-content">
          <div className="no-cards-message">
            {showMastered ? (
              <div>
                <h2>No mastered cards yet!</h2>
                <p>Master some cards first to see them here.</p>
                <button onClick={toggleMasteredView} className="control-btn primary">
                  View Active Cards
                </button>
              </div>
            ) : (
              <div>
                <h2>🎉 Congratulations!</h2>
                <p>You've mastered all the cards! Great job!</p>
                <button onClick={() => setMasteredCards([])} className="control-btn primary">
                  Reset All Cards
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header section */}
      <header className="header">
        <h1>🧠 Machine Learning Quiz</h1>
        <p className="subtitle">Master the fundamentals of ML concepts</p>
        <div className="stats">
          <span className="card-counter">
            Card {currentCardIndex + 1} of {totalCards}
          </span>
          <span className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${((currentCardIndex + 1) / totalCards) * 100}%`}}
            ></div>
          </span>
        </div>
        
        {/* Mastery stats */}
        <div className="mastery-stats">
          <span className="active-count">Active: {activeCards.length}</span>
          <span className="mastered-count">Mastered: {masteredCards.length}</span>
        </div>
      </header>

      {/* View toggle */}
      <div className="view-toggle">
        <button 
          onClick={toggleMasteredView}
          className={`toggle-btn ${!showMastered ? 'active' : ''}`}
        >
          Active Cards ({activeCards.length})
        </button>
        <button 
          onClick={toggleMasteredView}
          className={`toggle-btn ${showMastered ? 'active' : ''}`}
        >
          Mastered Cards ({masteredCards.length})
        </button>
      </div>

      {/* Card area */}
      <main className="main-content">
        <Card 
          card={getCurrentCard()}
          isFlipped={isFlipped}
          onCardClick={handleCardClick}
        />
        
        {/* Master/Unmaster button */}
        <div className="mastery-controls">
          {showMastered ? (
            <button 
              onClick={handleUnmasterCard}
              className="mastery-btn unmaster"
              title="Move back to active cards"
            >
              ↩️ Unmaster Card
            </button>
          ) : (
            <button 
              onClick={handleMasterCard}
              className="mastery-btn master"
              title="Mark as mastered and remove from active pool"
            >
              ⭐ Master Card
            </button>
          )}
        </div>
        
        {/* Input section for guessing - always show for active cards to prevent layout jump */}
        {!showMastered && (
          <div className="guess-section">
            <div className="input-container">
              <input
                type="text"
                value={userGuess}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={isFlipped ? "Answer revealed above" : "Enter your answer..."}
                className={`guess-input ${feedback}`}
                disabled={isCorrect || isFlipped}
              />
              <button 
                onClick={handleSubmitGuess}
                className={`submit-btn ${feedback}`}
                disabled={isCorrect || userGuess.trim() === '' || isFlipped}
              >
                Submit
              </button>
            </div>
            
            {/* Feedback display */}
            {feedback && (
              <div className={`feedback ${feedback}`}>
                {feedback === 'correct' ? (
                  <span>✅ Correct! Great job!</span>
                ) : (
                  <span>❌ Incorrect. Try again!</span>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Hint text */}
        <p className="hint">
          {showMastered ? "Viewing mastered cards • Click to flip" :
           isFlipped ? "Answer revealed • Click to see question again" : 
           isCorrect ? "Correct! Click card to see answer or navigate to next card" : 
           "Enter your guess above, then click card to reveal answer"}
        </p>
      </main>

      {/* Control buttons area */}
      <footer className="controls">
        <button 
          className={`control-btn secondary ${currentCardIndex === 0 ? 'disabled' : ''}`}
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
          title="Previous card"
        >
          ← Previous
        </button>
        
        <button 
          className={`control-btn primary ${currentCardIndex === totalCards - 1 ? 'disabled' : ''}`}
          onClick={handleNextCard}
          disabled={currentCardIndex === totalCards - 1}
          title="Next card"
        >
          → Next
        </button>
        
        <button 
          className="control-btn secondary" 
          onClick={handleReset}
          title="Reset to first card"
        >
          🔄 Reset
        </button>
      </footer>

      {/* Keyboard hints */}
      <div className="keyboard-hints">
        <small>
          {showMastered ? 
            "Tip: Click cards to flip • Use Unmaster to move back to active pool" :
            "Tip: Type your guess and press Enter • Click ⭐ to master cards • Use buttons to navigate"
          }
        </small>
      </div>
    </div>
  )
}

export default App;