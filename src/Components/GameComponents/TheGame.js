import React, { useState, useEffect} from "react";
import axios from "axios";
import TheCards from "./Cards";
import { useNavigate } from "react-router-dom";
const TheGame = ({ username, score, setScore }) => {
  const [pokemon, setPokemon] = useState([]);
  const [matchedCardsGame, setMatchedCardsGame] = useState([]);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const res = await axios.get("http://localhost:8800/pokemonimg");
        const shuffled = res.data.slice().sort(() => Math.random() - 0.5);
        setPokemon(shuffled);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setScore((prevScore) => prevScore - 1);
    }, 1000);

    if (matchedCardsGame.length === pokemon.length) {
      clearInterval(countdown);
    }
    if (matchedCardsGame.length === 10) {
      navigate("/finishedgame");
    }

    if (score === 0) {
      navigate("/gameover");
    }

    console.log(matchedCardsGame.length);
    return () => {
      clearInterval(countdown);
    };
  }, [matchedCardsGame, pokemon.length, setScore, navigate, score]);

  const handleCardMatch = (cardId) => {
    setMatchedCardsGame((prevMatchedCards) => [...prevMatchedCards, cardId]);
  };

  const goBack = () => {
    navigate("/");
    setScore(500)

  };

  const restart = () => {
    navigate("/thegame");
    setScore(500);
    setMatchedCardsGame([]);
  };

  return (
    <div className="container" style={{ height: "800px" }}>
      <TheCards cards={pokemon} onCardMatch={handleCardMatch} />
      <div className="row">
        <div className="col">
          <div className="" style={{ co: "left" }}>
            <div> {username} </div>
            <div>Score: {score}</div>
          </div>
        </div>
        <div className="col">
          <button className="btn btn-danger m-1" onClick={goBack}>
            EXIT
          </button>
          <button className="btn btn-warning m-1" onClick={restart}>
            RESTART
          </button>
        </div>
      </div>
    </div>
  );
};

export default TheGame;
