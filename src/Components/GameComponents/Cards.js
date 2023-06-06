import React, { useState } from "react";
import FlippingCards from "./FlippingCards";

const TheCards = ({ cards, onCardMatch }) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const handleClick = (id) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(id) ||
      matchedCards.includes(id)
    ) {
      return; // Return early if there are already two flipped cards, if the clicked card is already flipped, or if the card is already matched
    }
    setFlippedCards([...flippedCards, id]);
    if (flippedCards.length === 1) {
      // Check for match after the second card is flipped
      const [firstCardId] = flippedCards;
      const secondCardId = id;

      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      if (
        firstCard.matched_id === secondCard.matched_id &&
        firstCardId !== secondCardId
      ) {
        // Match found
        setMatchedCards([...matchedCards, firstCardId, secondCardId]);
        setFlippedCards([]); // Reset flipped cards
        onCardMatch(firstCardId); // Call the onCardMatch function with the matched card ID
      } else {
        // No match found
        setTimeout(() => {
          setFlippedCards([]); // Flip the cards back after a delay
        }, 1000);
      }
    }
  };

  return (
    <div className="card-container">
      <div className="row">
        {cards.map((card) => (
          <div
            key={card.id}
            className="col-3 mb-4 justify-content-center align-content-center d-flex"
          >
            <FlippingCards
              card={card}
              isFlipped={
                flippedCards.includes(card.id) || matchedCards.includes(card.id)
              }
              onClick={() => handleClick(card.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheCards;
