import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import GamePage from "./pages/GamePage";
import ThemeSelector from "./components/ThemeSelector";
import ScoreBoard from "./components/ScoreBoard";
import PrimaryButton from "./components/buttons/PrimaryButton";

function HomePage() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const themes = [
    {
      displayName: "Breast Cancer Awareness Month",
      fileName: "Breast_Cancer_Awareness_Month.json",
    },
    { displayName: "Halloween", fileName: "Halloween.json" },
    { displayName: "Autumn", fileName: "Høst.json" },
    { displayName: "Oktoberfest", fileName: "Oktoberfest.json" },
  ];

  const handleThemeSelect = (fileName) => {
    setSelectedTheme(fileName);
  };

  // First it checks if user has entered a username and selected a theme. If not, it alerts the user.
  // If both username and theme is selected, it navigates to the GamePage and passes the selected theme and username as state.
  const startGame = () => {
    if (!selectedTheme || !username) {
      let warning = "";
      if (!username) warning += "You must enter a username. ";
      if (!selectedTheme) warning += "You must select a theme.";
      alert(warning);
      return;
    }
    navigate("/GamePage", { state: { selectedTheme, username } });
  };

  return (
    <div className="flex justify-evenly items-start">
      <div className="ml-10 mt-10 p-4 bg-gray-100 rounded-md shadow-md max-w-xl">
        <h2 className="mt-10 mb-2 underline text-lg font-semibold">
          Enter a username, choose a theme and start the game
        </h2>
        <input
          type="text"
          placeholder="Username...."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <ThemeSelector themes={themes} onSelectTheme={handleThemeSelect} />
        <div className="mt-4">
          <PrimaryButton
            label="Start Game"
            onClick={startGame}
            disabled={!selectedTheme || !username}
          />
        </div>
      </div>
      <ScoreBoard />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="underline mt-10 ml-5 text-3xl font-bold mx-auto text-center">
          TypeMaster Theme Edition
        </h1>

        <Routes>
          <Route path="/GamePage" element={<GamePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
