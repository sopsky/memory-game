import { useNavigate } from "react-router-dom";


const GameOver = () => {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate("/")

      }
    
      const navigatePlayAgain = () => {
        navigate("/thegame")

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
          GAME OVER!

        </h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigatePlayAgain();
   
          }}
        >
          Play Again
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            navigateHome();

          }}
        >
          Exit Game
        </button>
        <div className="mt-3"></div>
      </div>
    </div>
  );
};

export default GameOver;