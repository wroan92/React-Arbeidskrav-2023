import React, { useState, useEffect } from "react";
import ThemeSelector from "./components/ThemeSelector";

function App() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [themeWords, setThemeWords] = useState([]);

  const themes = [
    {
      displayName: "Brest Cancer Awareness Month",
      fileName: "Breast_Cancer_Awareness_Month.json",
    },
    { displayName: "Halloween", fileName: "Halloween.json" },
    { displayName: "Autumn", fileName: "Høst.json" },
    { displayName: "Oktoberfest", fileName: "Oktoberfest.json" },
  ];

  const handleThemeSelect = (fileName) => {
    setSelectedTheme(fileName);
  };

  useEffect(() => {
    if (selectedTheme) {
      // Definer URL-en til JSON-filen basert på valgt tema
      const themeURL = `/data/${selectedTheme}`;

      // Hent ordene fra JSON-filen
      fetch(themeURL)
        .then((response) => response.json()) // Tilbake til response.json()
        .then((data) => {
          setThemeWords(data.words);
          console.log("Ordene ble lastet inn:", data.words);
        })
        .catch((error) => {
          console.error("Feil ved innlasting json fil:", error);
        });
    }
  }, [selectedTheme]);

  return (
    <div className="App">
      <h1>TypeMaster Theme Edition</h1>
      {selectedTheme ? (
        <div>
          <p>
            Choosen Theme:{" "}
            {
              themes.find((theme) => theme.fileName === selectedTheme)
                .displayName
            }
          </p>
          {/* Legg til komponenten for selve spillet her */}
          <ul>
            {themeWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      ) : (
        <ThemeSelector themes={themes} onSelectTheme={handleThemeSelect} />
      )}
    </div>
  );
}

export default App;
