import React from "react";

const FlippingCards = ({ card, isFlipped, onClick }) => {
  return (
    <div className={`card ${isFlipped ? "face-up" : "face-down"} mt-2`} onClick={onClick}>
    {isFlipped ? (
      <div>
        <img
          className="img-fluid"
          style={{ height: "80px", width: "80px" }}
          src={card.url}
          alt="Card"
        />
      </div>
    ) : (
      <div >
        <img
          className="img-fluid"
          style={{ height: "80px", width: "80px" }}
          src="https://www.pokemon.com/static-assets/app/static3/img/og-default-image.jpeg"
          alt=""
        />
      </div>
    )}
  </div>
  
  );
};

export default FlippingCards;
