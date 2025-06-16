import './App.css';
import React, { useState } from 'react';
import Card from './components/Card';
import cardData from './flashcards';

const App = () => {
 const [currentCardIndex, setCurrentCardIndex] = useState(0);
 const [isFlipped, setIsFlipped] = useState(false);

 const handleCardClick = () => {
   setIsFlipped(!isFlipped);
 }

 const handleNextCard = () => {
   let randomIndex;
   // Ensure we don't show the same card consecutively
   do {
     randomIndex = Math.floor(Math.random() * cardData.length);
   } while (randomIndex === currentCardIndex && cardData.length > 1);
   
   setCurrentCardIndex(randomIndex);
   setIsFlipped(false);
 }

 const handlePrevCard = () => {
   const prevIndex = currentCardIndex === 0 ? cardData.length - 1 : currentCardIndex - 1;
   setCurrentCardIndex(prevIndex);
   setIsFlipped(false);
 }

 const handleReset = () => {
   setCurrentCardIndex(0);
   setIsFlipped(false);
 }

 return (
   <div className="App">
     {/* Header section */}
     <header className="header">
       <h1>🧠 Machine Learning Quiz</h1>
       <p className="subtitle">Master the fundamentals of ML concepts</p>
       <div className="stats">
         <span className="card-counter">
           Card {currentCardIndex + 1} of {cardData.length}
         </span>
         <span className="progress-bar">
           <div 
             className="progress-fill" 
             style={{width: `${((currentCardIndex + 1) / cardData.length) * 100}%`}}
           ></div>
         </span>
       </div>
     </header>

     {/* Card area */}
     <main className="main-content">
       <Card 
         card={cardData[currentCardIndex]}
         isFlipped={isFlipped}
         onCardClick={handleCardClick}
       />
       
       {/* Hint text */}
       <p className="hint">
         {isFlipped ? "Click to see question" : "Click to reveal answer"}
       </p>
     </main>

     {/* Control buttons area */}
     <footer className="controls">
       <button 
         className="control-btn secondary" 
         onClick={handlePrevCard}
         title="Previous card"
       >
         ← Previous
       </button>
       
       <button 
         className="control-btn primary" 
         onClick={handleNextCard}
         title="Random card"
       >
         🎲 Random
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
       <small>Tip: Click the card to flip • Use buttons to navigate</small>
     </div>
   </div>
 )
}

export default App;