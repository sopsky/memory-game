import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const GameFinished = ({ score, username, setScore }) => {
  const navigate = useNavigate();
  let user_id = Cookies.get('user_id'); 
 

  const handleSaveScore = () => {
    if (!user_id || username !== Cookies.get('username')) {
      // User does not exist or username has changed, create a new user
      axios.post('http://localhost:8800/users', { username })
        .then(userResponse => {
          user_id = userResponse.data.user_id; // Set the user_id from the response
  
          Cookies.set('user_id', user_id); // Store user_id in cookie
          Cookies.set('username', username); // Store the new username in cookie
  
          saveScore();
        })
        .catch(error => {
          console.error(error);
        });
      
    } else {
      // User already exists, directly save the score
      saveScore();
    }
  };
  
  const saveScore = () => {
    axios.post('http://localhost:8800/topscore', { score })
      .then(scoreResponse => {
        const score_id = scoreResponse.data.score_id; // Get the score_id from the response
  
        // Make a POST request to /userscore with user_id and score_id
        axios.post('http://localhost:8800/userscore', { user_id, score_id })
          .then(userscoreResponse => {
            console.log(userscoreResponse.data); // Optional: Log the response from the server
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
      
  };
  
  const navigateHome = () => {
    navigate("/")
    setScore(500)
  }

  const navigatePlayAgain = () => {
    navigate("/thegame")
    setScore(500)
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
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          Congratulations! You have finished the game, {username}!
          <div>
            <h2>Your score is {score}</h2>
          </div>
        </h1>
        <button className="btn btn-primary" onClick={() => {navigatePlayAgain(); handleSaveScore();}}>
        Play Again
      </button> 
      <button className="btn btn-danger" onClick={() => {navigateHome(); handleSaveScore();}}>
      Exit Game
    </button>
        <div className="mt-3"></div>
      </div>
    </div>
  );
};

export default GameFinished;
