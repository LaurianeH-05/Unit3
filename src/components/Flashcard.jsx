import { useState, useEffect } from 'react';

function Flashcard({ card, onNext, onBack, onAnswered, isAnswered }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setIsFlipped(false);
    setUserGuess('');
    setFeedback('');
  }, [card]);

  const checkAnswer = (guess) => {
    const normalizedGuess = guess.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '');
    const normalizedAnswer = card.answer.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '');
    const singularize = (str) => str.replace(/s\b/g, '');
    return normalizedGuess === normalizedAnswer || 
           normalizedAnswer.includes(normalizedGuess) ||
           normalizedGuess.includes(normalizedAnswer) ||
           singularize(normalizedGuess) === singularize(normalizedAnswer)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userGuess) return;
    
    const isCorrect = checkAnswer(userGuess);
    setFeedback(isCorrect ? 'Correct! 🎉' : 'Incorrect. Try again!');
    setIsFlipped(true);
    
    if (isCorrect) {
      onAnswered(card.id);
    }
  };

  return (
    <div className="flashcard-container">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        <div className="front">
          {card.image && (
            <img src={card.image} alt="Visual aid" className="card-image" />
          )}
          <h3>{card.question}</h3>
          
          {!isAnswered && (
            <form onSubmit={handleSubmit} className="answer-form">
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Enter your answer"
                disabled={isAnswered}
              />
              <button type="submit" disabled={isAnswered}>
                Submit
              </button>
            </form>
          )}
        </div>

        <div className="back">
          <h3>Answer</h3>
          <p>{card.answer}</p>
          {feedback && <div className={`feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`}>
            {feedback}
          </div>}
          <div className="category-badge">{card.category}</div>
        </div>
      </div>

      <div className="navigation-controls">
        <button onClick={onBack} className="nav-button">
          ← Back
        </button>
        <button onClick={onNext} className="nav-button">
          Next →
        </button>
      </div>
    </div>
  );
}

export default Flashcard;