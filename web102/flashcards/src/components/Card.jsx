import React from "react"

const Card = ({ card, isFlipped, onCardClick }) => {
  return (
    <div className="card-container" onClick={onCardClick}>
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <p>{card.front}</p>
        </div>
        <div className="card-back">
          <p>{card.back}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;