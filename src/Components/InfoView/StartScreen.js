import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const StartScreen = ({ username }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/thegame");
  };

  const goBack = () => {
    navigate("/")
  }

  const highScore = () => {
    navigate("/highscore")
  }

  return (
    <div className="position-relative">
      <img
        className="img-fluid"
        src="https://wallpapers.com/images/featured/va6139eg5csznzmw.jpg"
        alt="pokemon"
        style={{ maxWidth: "80%", maxHeight: "80%", margin: "auto" }}
      />
      <div className="position-absolute top-50 start-50 translate-middle text-center">
        <h1
          className="fs-3 fs-lg-5 rounded p-2"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          Are you ready to play the game, {username} ?
        </h1>
        <div className="">
          <button
            className=" btn btn-danger w-25 mx-auto"
            onClick={goBack}
          >
            EXIT
          </button>
          <button
            className=" btn btn-success w-25 mx-auto m-2"
            onClick={handleStartClick}
          >
            START
          </button>
          <button
          className=" btn btn-light w-25 mx-auto m-2"
          onClick={highScore}
        >
          HIGHSCORE
        </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
