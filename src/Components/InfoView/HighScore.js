import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HighScore = () => {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();


  const goBack = () => {
    navigate("/startscreen")
  }

  const startAGame = () => {
    navigate("/thegame");
  }

  useEffect(() => {
    axios
      .get("http://localhost:8800/topscore")
      .then((response) => {
        const topScores = response.data.slice(0, 5); // Select only the first 5 high scores
        const scoreIds = topScores.map((score) => score.score_id);

        axios
          .get("http://localhost:8800/userscore")
          .then((response) => {
            const userScores = response.data.filter((score) =>
              scoreIds.includes(score.score_id)
            );

            axios
              .get("http://localhost:8800/users")
              .then((response) => {
                const userMap = {};
                response.data.forEach((user) => {
                  userMap[user.user_id] = user.username;
                });

                const fetchScores = async () => {
                  const updatedScores = await Promise.all(
                    userScores.map(async (score) => ({
                      username: userMap[score.user_id],
                      score: await getScoreByScoreId(score.score_id),
                    }))
                  );

                  setScores(updatedScores);
                };

                fetchScores();
              })
              .catch((error) => {
                console.error("Error fetching user data:", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching user scores:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching scores:", error);
      });
  }, []);

  const getScoreByScoreId = async (scoreId) => {
    try {
      const response = await axios.get(
        `http://localhost:8800/topscore/${scoreId}`
      );
      return response.data[0].score;
    } catch (error) {
      console.error("Error fetching score:", error);
    }
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
          HighScore
        </h1>
        <div className="mt-3">
          <ul className="list-group" style={{ textAlign: "left" }}>
            {scores.map((score, idx) => (
              <li
                key={idx}
                style={{ color: "white" }}
                className="list-group-item bg-black"
              >
                {score.username} - {score.score}
              </li>
            ))}
          </ul>
        </div>
        <div >
        <button className="btn btn-primary m-1" onClick={goBack} >Go Back</button>
        <button className="btn btn-success m-1" onClick={startAGame}>Play a game</button>
        </div>
      </div>
    </div>
  );
};

export default HighScore;
