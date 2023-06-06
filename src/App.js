import "./App.css";
import FrontPageUserName from "./Components/InfoView/FrontPageUserName";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartScreen from "./Components/InfoView/StartScreen";
import { useState } from "react";
import GameFinished from "./Components/InfoView/GameFinished";
import TheGame from "./Components/GameComponents/TheGame";
import HighScore from "./Components/InfoView/HighScore";
import GameOver from "./Components/InfoView/GameOver";

function App() {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(500);

  return (
    <div className="App">
      <div className="App-header">
        <div style={{ border: "1px solid black" }}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={<FrontPageUserName setUsername={setUsername} />}
              />
              <Route
                path="/startscreen"
                element={<StartScreen username={username} />}
              />
              <Route
              path="/highscore"
              element={<HighScore/>}
            />
              <Route
                path="/thegame"
                element={
                  <TheGame
                    username={username}
                    score={score}
                    setScore={setScore}
                  />
                }
              />
              <Route
                path="/finishedgame"
                element={
                  <GameFinished
                    username={username}
                    score={score}
                    setScore={setScore}
                  />
                }
              />
              <Route
              path="/gameover"
              element={
                <GameOver
                />
              }
            />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
