import { useState } from 'react';
import { flashcards } from './data';
import Flashcard from './components/Flashcard';
import './styles.css';

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [answeredCards, setAnsweredCards] = useState(new Set());

  const handleNextCard = () => {
    setCurrentCardIndex(prev => (prev + 1) % flashcards.length);
  };

  const handleBackCard = () => {
    setCurrentCardIndex(prev => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleAnswered = (id) => {
    setAnsweredCards(prev => new Set([...prev, id]));
  };

  return (
    <div className="app">
      <header>
        <h1>💰 Teen Financial Literacy Flashcards</h1>
        <p>Cards remaining: {flashcards.length - answeredCards.size}</p>
      </header>
      <Flashcard 
        card={flashcards[currentCardIndex]} 
        onNext={handleNextCard}
        onBack={handleBackCard}
        onAnswered={handleAnswered}
        isAnswered={answeredCards.has(flashcards[currentCardIndex].id)}
      />
    </div>
  );
}

export default App;