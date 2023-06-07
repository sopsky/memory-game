import axios from 'axios';
import { useNavigate } from "react-router-dom";

const GameFinished = ({ score, username, setScore }) => {
  const navigate = useNavigate();

 
  const handleSaveScore = async () => {
    try {
      // Get the user ID based on the username
      const response = await axios.get(`http://localhost:8800/usersid?username=${username}`);
      const user = response.data[0];

      if (user) {
        const userId = user.user_id;

        // Save the score with the user ID
        await axios.post('http://localhost:8800/scores', { score, user_id: userId });

        // Handle successful score save
        console.log('Score saved successfully!');
      } else {
        // Handle case when user is not found
        console.error('User not found');
      }
    } catch (error) {
      // Handle error saving the score
      console.error('Error saving the score:', error);
    }
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
