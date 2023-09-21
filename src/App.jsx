import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import GamePage from "./pages/GamePage";
import ThemeSelector from "./components/ThemeSelector";
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

  const startGame = () => {
    if (selectedTheme) {
      navigate("/GamePage", { state: { selectedTheme, username } }); // Send brukernavnet som en del av state
    }
  };

  return (
    <>
      <h2>Enter a username, choose a theme and start the game</h2>
      <input 
        type="text" 
        placeholder="Username...." 
        value={username} // Bind input til username tilstandsvariabelen
        onChange={(e) => setUsername(e.target.value)} // Oppdater username tilstandsvariabelen når brukeren skriver
      />
      <ThemeSelector themes={themes} onSelectTheme={handleThemeSelect} />
      {selectedTheme && (
        <div>
          <PrimaryButton label="Start Game" onClick={startGame} />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="underline">TypeMaster Theme Edition</h1>

        <Routes>
          <Route path="/GamePage" element={<GamePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
