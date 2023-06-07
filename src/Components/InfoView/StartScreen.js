import { useNavigate } from "react-router-dom";

const StartScreen = ({ username }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/thegame");
  };

  const goBack = () => {
    navigate("/");
  };

  const highScore = () => {
    navigate("/highscore");
  };

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
          <span className="m-1">
            <button
              className="btn btn-danger  w-md-25 mx-auto"
              style={{ fontSize: "0.875rem" }}
              onClick={goBack}
            >
              EXIT
            </button>
          </span>
          <span className="m-1">
            <button
              className="btn btn-success  w-md-25 mx-auto"
              style={{ fontSize: "0.875rem" }}
              onClick={handleStartClick}
            >
              START
            </button>
          </span>
          <span className="m-1">
            <button
              className="btn btn-light  w-md-25 mx-auto "
              style={{ fontSize: "0.875rem" }}
              onClick={highScore}
            >
              HIGHSCORE
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
